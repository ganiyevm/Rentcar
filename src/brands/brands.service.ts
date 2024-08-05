import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../common/dto/create-brand.dto';
import { CarsRepository } from 'src/cars/cars.repository';

@Injectable()
export class BrandsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async createModel(createBrandDto: CreateBrandDto) {
    try {
      const existBrand = await this.carsRepository.findOneBrand(
        createBrandDto.name,
      );

      if (existBrand) {
        return new HttpException(
          'This Brand is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newColor = await this.carsRepository.createBrand(
        createBrandDto.name,
      );

      if (!newColor) {
        return new HttpException(
          'Internal Servser Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        message: 'Color successfully created',
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteModel(id: string) {
    try {
      const existColor = await this.carsRepository.findByIdBrand(id);

      if (!existColor) {
        return new HttpException('Not Fonud', HttpStatus.NOT_FOUND);
      }

      await this.carsRepository.deleteBrand(id);

      return {
        message: 'Brand successfully deleted',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Servser Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
