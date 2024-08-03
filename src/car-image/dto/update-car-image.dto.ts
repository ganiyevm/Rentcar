import { PartialType } from '@nestjs/mapped-types';
import { CreateCarImageDto } from './create-car-image.dto';

export class UpdateCarImageDto extends PartialType(CreateCarImageDto) {}
