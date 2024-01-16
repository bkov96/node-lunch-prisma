import { Injectable } from '@nestjs/common';
import { Prisma, Category } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/prisma/prisma.service';

type CategoryDelegate = Prisma.CategoryDelegate<DefaultArgs>;

export type PrismaCategory = Category;

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  get category(): CategoryDelegate {
    return this.prisma.category;
  }

  findById(id: string): Promise<PrismaCategory | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<PrismaCategory | null> {
    return this.prisma.category.findUnique({ where: { name } });
  }
}
