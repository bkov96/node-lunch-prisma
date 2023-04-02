import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'fantasy' })
  @Length(1, 30)
  name: string;
}
