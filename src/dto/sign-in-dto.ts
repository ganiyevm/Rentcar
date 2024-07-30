import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  password: string;
}
