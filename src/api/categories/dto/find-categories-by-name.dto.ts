import { ApiProperty } from '@nestjs/swagger';
import { Category as PrismaCategory } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class FindCategoriesByNameDto implements PrismaCategory {
  constructor(partial: Partial<FindCategoriesByNameDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ name: 'id', description: 'UUID of the category' })
  id: string;

  @ApiProperty({ name: 'id', description: 'UUID of the category' })
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
