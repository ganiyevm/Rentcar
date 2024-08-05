import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from '../common/dto/create-brand.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiProperty({ type: CreateBrandDto })
  @Post()
  createModel(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.createModel(createBrandDto);
  }

  @Delete(':id')
  deleteModel(@Param('id') id: string) {
    return this.brandsService.deleteModel(id);
  }
}
