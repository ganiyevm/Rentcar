import { Injectable } from '@nestjs/common';
import { CreateCarImageDto } from '../common/dto/create-car-image.dto';

@Injectable()
export class CarImageService {
  async createImage(createCarImageDto: CreateCarImageDto) {
    return 
  }

  
  async deleteImage(id: string) {
    return 
  }
}
