import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentDetailsService } from './rent-details.service';
import { CreateRentDetailDto } from './dto/create-rent-detail.dto';
import { UpdateRentDetailDto } from './dto/update-rent-detail.dto';

@Controller('rent-details')
export class RentDetailsController {
  constructor(private readonly rentDetailsService: RentDetailsService) {}

  @Post()
  create(@Body() createRentDetailDto: CreateRentDetailDto) {
    return this.rentDetailsService.create(createRentDetailDto);
  }

  @Get()
  findAll() {
    return this.rentDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentDetailDto: UpdateRentDetailDto) {
    return this.rentDetailsService.update(+id, updateRentDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentDetailsService.remove(+id);
  }
}
