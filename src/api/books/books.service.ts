import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBookWithCategoryDto } from './dto/create-book-with-category.dto';
import { Prisma, Book as PrismaBook } from '@prisma/client';

export type PrismaBookWithCategory = Prisma.BookGetPayload<{
  include: { category: true };
}>;

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  createWithCategory(
    createBookWithCategoryDto: CreateBookWithCategoryDto,
  ): Promise<PrismaBook> {
    const { categoryName, ...bookData } = createBookWithCategoryDto;

    return this.prisma.book.create({
      data: {
        ...bookData,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
      },
    });
  }

  updateBookCategory(id: string, categoryName: string): Promise<PrismaBook> {
    return this.prisma.book.update({
      where: { id },
      data: {
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
      },
    });
  }

  findAllBooksWithCategories(): Promise<PrismaBookWithCategory[]> {
    return this.prisma.book.findMany({ include: { category: true } });
  }
}
