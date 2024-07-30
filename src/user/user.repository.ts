import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(newUser: any) {
    return await this.prisma.user.create({ data: { ...newUser } });
  }

  async createOtp(newOtp: { userId: string; otp: string }) {
    await this.prisma.otp.create({ data: newOtp });
  }
}
