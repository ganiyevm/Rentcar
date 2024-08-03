import { Injectable } from '@nestjs/common';
import { CreateRentDetailDto } from './dto/create-rent-detail.dto';
import { UpdateRentDetailDto } from './dto/update-rent-detail.dto';

@Injectable()
export class RentDetailsService {
  create(createRentDetailDto: CreateRentDetailDto) {
    return 'This action adds a new rentDetail';
  }

  findAll() {
    return `This action returns all rentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rentDetail`;
  }

  update(id: number, updateRentDetailDto: UpdateRentDetailDto) {
    return `This action updates a #${id} rentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentDetail`;
  }
}
