import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(newUser: any) {
    return await this.prisma.user.create({ data: { ...newUser } });
  }

  async createOtp(newOtp: { userId: string; otp: string }) {
    await this.prisma.otp.create({ data: newOtp });
  }

  async findOneOtp(userId: string) {
    return await this.prisma.otp.findUnique({ where: { userId } });
  }

  async deleteOtp(id: string) {
    await this.prisma.otp.delete({ where: { id } });
  }

  async updateUserStatus(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
  }

  async createAndUpdateToken(refreshToken: {
    userId: string;
    refresh: string;
  }) {
    const { userId, refresh } = refreshToken;
    const existToken = await this.prisma.refresh.findUnique({
      where: { userId },
    });
    if (existToken) {
      return await this.prisma.refresh.update({
        where: { userId },
        data: { refresh },
      });
    }
    return await this.prisma.refresh.create({ data: { userId, refresh } });
  }

  async deleteToken(userId: string) {
    await this.prisma.refresh.delete({ where: { userId } });
  }
}
