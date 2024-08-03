import { Module } from '@nestjs/common';
import { RentDetailsService } from './rent-details.service';
import { RentDetailsController } from './rent-details.controller';

@Module({
  controllers: [RentDetailsController],
  providers: [RentDetailsService],
})
export class RentDetailsModule {}
