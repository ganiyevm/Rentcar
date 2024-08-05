import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneColor(color: string) {
    return await this.prisma.color.findFirst({ where: { color } });
  }

  async findByIdColor(id: string) {
    return await this.prisma.color.findUnique({ where: { id } });
  }
    
  async createColor(color: string) {
    return await this.prisma.color.create({ data: { color } });
  }

  async deleteColor(id: string) {
    await this.prisma.color.delete({ where: { id } });
  }
}
