import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

export type PrismaCategory = Category;

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  get category(): PrismaService['category'] {
    return this.prisma.category;
  }

  findById(id: string): Promise<PrismaCategory | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<PrismaCategory | null> {
    return this.prisma.category.findUnique({ where: { name } });
  }
}
