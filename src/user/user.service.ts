import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpUserDto } from 'src/common/dto';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService

  ) { }
  
  async create(createUserDto: any) {
    try {
      const { firstName, email, password, } = createUserDto;

      
      const existUser = await this.userRepository.findByEmail(email);

      if (existUser) {
        return new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }
      const salt = this.configService.get<number>('bcrypt_salt');

      const hashedPassword = await bcrypt.hash(password, salt);

      const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

      const newUser = await this.userRepository.createUser({
        firstName,
        email,
        ...createUserDto,
        password: hashedPassword,
      });

      await this.mailerService.sendMail({
        to: email,
        subject: 'Your One Time Password',
        html: `<h2>${otp}</h2>`,
      });

      await this.userRepository.createOtp({ userId: newUser.id, otp });

      return {
        message: 'User created successfully',
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  delete(id: string) {
    return `This action removes a #${id} user`;
  }
}
