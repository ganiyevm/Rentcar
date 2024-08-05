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

  async findByIdBrand(id: string) {
    return await this.prisma.brand.findUnique({ where: { id } });
  }
    
  async createColor(color: string) {
    return await this.prisma.color.create({ data: { color } });
  }

  async createBrand(name: string) {
    return await this.prisma.brand.create({ data: { name } });
  }

  async deleteColor(id: string) {
    await this.prisma.color.delete({ where: { id } });
  }

  async findOneBrand(name: string) {
    return await this.prisma.brand.findFirst({ where: { name } });
  }

  async deleteBrand(id: string) {
    await this.prisma.brand.delete({ where: { id } });
  }
}
