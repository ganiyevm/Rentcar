import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto, OtpVerifyDto } from '../common/dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiProperty({ type: SignUpUserDto })
  @Post('signup')
  signup(@Body() createUserDto: SignUpUserDto) {
    return this.authService.signup(createUserDto);
  }
  @ApiProperty({ type: OtpVerifyDto })
  @Post('otp-verify')
  otp_verify(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.otp_verify(otpVerifyDto);
  }

  @ApiProperty({ type: SignInUserDto })
  @Post('signin')
  signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }

  @Post('refresh-token')
  refresh_token(@Body() refreshToken: any) {
    return this.authService.refresh_token(refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get('getMe')
  getMe(@Req() request: Request) {
    return this.authService.getMe(request);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERVISOR, Role.CLIENT, Role.USER)
  @Get('logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }
}
