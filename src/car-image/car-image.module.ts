import { Module } from '@nestjs/common';
import { CarImageService } from './car-image.service';
import { CarImageController } from './car-image.controller';

@Module({
  controllers: [CarImageController],
  providers: [CarImageService],
})
export class CarImageModule {}
