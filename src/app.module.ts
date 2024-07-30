import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NestConfigModule } from './config/config.module';
import {JwtModule } from "@nestjs/jwt"
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [NestConfigModule,
    JwtModule.registerAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.tokenSecret')
      }),
      global: true
    }),
    AuthModule,
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
