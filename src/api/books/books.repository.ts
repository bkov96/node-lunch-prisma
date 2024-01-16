import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/prisma/prisma.service';

type BookDelegate = Prisma.BookDelegate<DefaultArgs>;
type BookCreateInputWithoutCategory = Omit<Prisma.BookCreateInput, 'category'>;

export type PrismaBook = Book;
export type PrismaBookWithCategory = Prisma.BookGetPayload<{
  include: { category: true };
}>;

@Injectable()
export class BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  get book(): BookDelegate {
    return this.prisma.book;
  }

  createWithCategory(categoryName: string, bookCreateInputWithoutCategory: BookCreateInputWithoutCategory): Promise<PrismaBookWithCategory> {
    return this.prisma.book.create({
      data: {
        ...bookCreateInputWithoutCategory,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
      },
      include: {
        category: true,
      },
    });
  }

  updateOrCreateBookCategory(bookId: string, categoryName: string): Promise<PrismaBookWithCategory> {
    return this.prisma.book.update({
      where: { id: bookId },
      data: {
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
      },
      include: {
        category: true,
      },
    });
  }
}
