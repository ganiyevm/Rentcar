import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from '../common/dto/create-model.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('models')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) { }

  @ApiProperty({ type: CreateModelDto })
  @Post()
  createModel(@Body() createModelDto: CreateModelDto) {
    return this.modelsService.createModel(createModelDto);
  }


  @Delete(':id')
  deleteModel(@Param('id') id: string) {
    return this.modelsService.deleteModel(id);
  }
}
