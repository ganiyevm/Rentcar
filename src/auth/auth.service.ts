import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SignUpUserDto, SignInUserDto, OtpVerifyDto } from '../common/dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  signup(createUserDto: SignUpUserDto) {
    return this.userService.create(createUserDto);
  }

  async otp_verify(otpVerifyDto: OtpVerifyDto) {
    try {
      const { email, otp } = otpVerifyDto;

      const existUser = await this.userRepository.findByEmail(email);

      if (!existUser) {
        return new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      const existOtp = await this.userRepository.findOneOtp(existUser.id);

      if (existOtp.otp !== otp) {
        return new HttpException(
          'Invalid One Time Password',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userRepository.deleteOtp(existOtp.id);

      await this.userRepository.updateUserStatus(existUser.id);

      return {
        message: 'Otp verify',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signin(signInUserDto: SignInUserDto) {
    try {
      const { email, password } = signInUserDto;

      const existUser = await this.userRepository.findByEmail(email);

      if (!existUser) {
        return new HttpException('Invalid Email', HttpStatus.BAD_REQUEST);
      }

      const checkPassword = await bcrypt.compare(password, existUser.password);

      if (!checkPassword) {
        return new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
      }

      const accessTime = this.configService.get<string>('jwt.accessTime');

      const refreshTime = this.configService.get<string>('jwt.refreshTime');

      const accessToken = this.generateToken(
        { id: existUser.id, email, name: existUser.firstName },
        { expiresIn: accessTime },
      );
      const refreshToken = this.generateToken(
        { id: existUser.id, email, name: existUser.firstName },
        { expiresIn: refreshTime },
      );

      const refresh = await this.userRepository.createAndUpdateToken({
        refresh: refreshToken,
        userId: existUser.id,
      });

      if (!refresh) {
        return new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  generateToken(
    payload: { id: string; email: string; name: string },
    expire: { expiresIn: string },
  ) {
    return this.jwtService.sign(payload, expire);
  }

  async refresh_token(refreshToken: any) {
    try {
      if (typeof refreshToken !== 'string') {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }

      const decodedUser = await this.jwtService.verify(refreshToken);

      console.log(decodedUser)
      
      if (decodedUser.id !== 'string') {
        return new HttpException('You must be signin', HttpStatus.BAD_REQUEST);
      }


    } catch (error) {
      console.log(error.name);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }


  }

  async getMe() {}

  async logout() {}
}
