import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateColorDto } from '../common/dto/create-color.dto';
import { CarsRepository } from 'src/cars/cars.repository';

@Injectable()
export class ColorService {
  constructor(private readonly CarsRepository: CarsRepository) {}

  async createColor(createColorDto: CreateColorDto) {
    try {
      const existColor = await this.CarsRepository.findOneColor(
        createColorDto.color,
      );
      
      if (existColor) {
        return new HttpException(
          'This color is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newColor = await this.CarsRepository.createColor(
        createColorDto.color,
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

  async deleteColor(id: string) {
    try {
      const existColor = await this.CarsRepository.findByIdColor(id);

      if (!existColor) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.CarsRepository.deleteColor(id);

      return {
        message: 'Successfully Deleted',
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
