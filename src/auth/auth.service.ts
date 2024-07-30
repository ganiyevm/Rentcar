import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SignUpUserDto, SignInUserDto, OtpVerifyDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
  async signup(createUserDto: SignUpUserDto) {
    try {
      const { firstName, lastName, email, password, age } = createUserDto;
      const existUser = await this.userRepository.findByEmail(email);

      if (existUser) {
        return new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      const salt = this.configService.get<number>('bcrypt_salt');

      const hashedPassword = bcrypt.hash(password, salt);

      const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

      const newUser = await this.userRepository.createUser({
        firstName,
        lastName,
        email,
        age,
        password: hashedPassword,
      });

      await this.userRepository.createOtp({ userId: newUser.id, otp });
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async otp_verify(otpVerifyDto: OtpVerifyDto) {}

  async signin(signInUserDto: SignInUserDto) {}

  async refresh_token(refreshToken: any) {}

  async getMe() {}

  async logout() {}
}
