import { PartialType } from '@nestjs/mapped-types';
import { CreateRentDetailDto } from './create-rent-detail.dto';

export class UpdateRentDetailDto extends PartialType(CreateRentDetailDto) {}
