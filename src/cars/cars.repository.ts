import { Injectable } from '@nestjs/common';
import { CreateCarDto } from 'src/common/dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneColor(color: string) {
    return await this.prisma.color.findFirst({ where: { color } });
  }

  async findOneModel(name: string) {
    return await this.prisma.model.findFirst({ where: { name } });
  }

  async findByIdColor(id: string) {
    return await this.prisma.color.findUnique({ where: { id } });
  }

  async findByIdBrand(id: string) {
    return await this.prisma.brand.findUnique({ where: { id } });
  }

  async findByIdModel(id: string) {
    return await this.prisma.model.findUnique({ where: { id } });
  }

  async createColor(color: string) {
    return await this.prisma.color.create({ data: { color } });
  }

  async createModel(name: string) {
    return await this.prisma.model.create({ data: { name } });
  }

  async createBrand(name: string) {
    return await this.prisma.brand.create({ data: { name } });
  }

  async deleteColor(id: string) {
    await this.prisma.color.delete({ where: { id } });
  }

  async deleteModel(id: string) {
    await this.prisma.model.delete({ where: { id } });
  }

  async findOneBrand(name: string) {
    return await this.prisma.brand.findFirst({ where: { name } });
  }

  async deleteBrand(id: string) {
    await this.prisma.brand.delete({ where: { id } });
  }

  async createCar(createCarDto: CreateCarDto) {
    const { brandId, modelId, colorId, factoryDate, price, carImages } = createCarDto;

    return await this.prisma.car.create({
      data: {
        brandId,
        modelId,
        colorId,
        factoryDate: new Date(factoryDate),
        price,
        carImages: {
          create: carImages.map((image) => ({
            url: image,
            mimetype: 'image/jpeg', 
          })),
        },
      },
    });
  }

  async createImage() {
    const newImage = await this.prisma.carImage.create({
      data: {
        id: fileId,
        url: `/uploads/${filename}`,
        mimetype: file.mimetype,
        carId: 'some-car-id', // Replace with actual carId or pass it as part of the request
      },
    });
  }

}
