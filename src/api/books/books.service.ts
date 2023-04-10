import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBookWithCategoryDto } from './dto/create-book-with-category.dto';
import { Book as PrismaBook } from '@prisma/client';

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
}
