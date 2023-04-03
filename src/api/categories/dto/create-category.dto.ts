import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateCategoryDto
  implements Pick<Prisma.CategoryCreateInput, 'name'>
{
  @ApiProperty({ example: 'fantasy' })
  @Length(1, 30)
  name: string;
}
