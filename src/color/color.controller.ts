import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from '../common/dto/create-color.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';


@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @ApiProperty({ type: CreateColorDto })
  @Post()
  createColor(@Body() createColorDto: CreateColorDto) {
    return this.colorService.createColor(createColorDto);
  }

  @Delete(':id')
  deleteColor(@Param('id') id: string) {
    return this.colorService.deleteColor(id);
  }
}
