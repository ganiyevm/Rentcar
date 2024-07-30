import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  age: number;

  @IsString()
  @IsNotEmpty()
  @Length(4, 40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  password: string;

  @IsEnum(['client', 'supervisor', 'admin'])
  @IsOptional()
  role: 'client' | 'supervisor' | 'admin';
}
