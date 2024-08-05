import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RentDetailsService } from './rent-details.service';
import { CreateRentDetailDto } from '../common/dto/create-rent-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('rent-details')
@Controller('rent-details')
export class RentDetailsController {
  constructor(private readonly rentDetailsService: RentDetailsService) { }

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
  update(@Param('id') id: string, @Body() updateRentDetailDto: any) {
    return this.rentDetailsService.update(+id, updateRentDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentDetailsService.remove(+id);
  }
}
