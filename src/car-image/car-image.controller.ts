import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarImageService } from './car-image.service';
import { CreateCarImageDto } from '../common/dto/create-car-image.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('car-image')
@Controller('car-image')
export class CarImageController {
  constructor(private readonly carImageService: CarImageService) {}

  @ApiProperty({ type: CreateCarImageDto })
  @Post()
  createImage(@Body() createCarImageDto: CreateCarImageDto) {
    return this.carImageService.createImage(createCarImageDto);
  }

  @Delete(':id')
  deleteImage(@Param('id') id: string) {
    return this.carImageService.deleteImage(id);
  }
}
