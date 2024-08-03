import { Injectable } from '@nestjs/common';
import { CreateCarImageDto } from './dto/create-car-image.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';

@Injectable()
export class CarImageService {
  create(createCarImageDto: CreateCarImageDto) {
    return 'This action adds a new carImage';
  }

  findAll() {
    return `This action returns all carImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carImage`;
  }

  update(id: number, updateCarImageDto: UpdateCarImageDto) {
    return `This action updates a #${id} carImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} carImage`;
  }
}
