import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto, OtpVerifyDto } from "../common/dto";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() createUserDto: SignUpUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('otp-verify')
  otp_verify(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.otp_verify(otpVerifyDto);
  }

  @Post('signin')
  signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }

  @Post('refresh-token')
  refresh_token(@Body() refreshToken: any) {
    return this.authService.refresh_token(refreshToken);
  }

  @Get('getMe')
  getMe() {
    return this.authService.getMe();
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
