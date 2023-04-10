import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateCategoryDto
  implements Pick<Prisma.CategoryCreateInput, 'name'>
{
  @ApiProperty({ example: 'fantasy' })
  @IsString()
  @Length(1, 30)
  name: string;
}
