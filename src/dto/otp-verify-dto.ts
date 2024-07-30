// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAuthDto } from './sign-up-dto';

// export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class OtpVerifyDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}
