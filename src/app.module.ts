import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NestConfigModule } from './config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [
    NestConfigModule,
    JwtModule.registerAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.tokenSecret'),
      }),
      global: true,
    }),
    MailerModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.MAIL_HOST'),
          port: Number(configService.get<string>('mail.MAIL_PORT')),
          secure: false,
          auth: {
            user: configService.get<string>('mail.MAIL_USER'),
            pass: configService.get<string>('mail.MAIL_PASS'),
          },
        },
      }),
    }),
    AuthModule,
    UserModule,
    CarsModule,
    BrandsModule,
    ModelsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
