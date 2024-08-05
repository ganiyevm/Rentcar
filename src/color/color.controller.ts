import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from '../common/dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Roles } from 'src/common/guards/roles.decorator';


@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
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
