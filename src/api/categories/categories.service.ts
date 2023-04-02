import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, Category as PrismaCategory } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  createNew(data: Prisma.CategoryCreateInput): Promise<PrismaCategory> {
    return this.prisma.category.create({ data });
  }
}
