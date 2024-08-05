import { Injectable } from '@nestjs/common';
import { CreateColorDto } from '../common/dto/create-color.dto';

@Injectable()
export class ColorService {
  async createColor(createColorDto: CreateColorDto) {
    return 
  }


  async deleteColor(id: string) {
    return 
  }
}
