import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, Category as PrismaCategory } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  createNew(data: Prisma.CategoryCreateInput): Promise<PrismaCategory> {
    return this.prisma.category.create({ data });
  }

  findMany(cfg?: {
    where?: Prisma.CategoryWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<PrismaCategory[]> {
    const { where, skip, take, orderBy } = cfg || {};

    return this.prisma.category.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }
}
