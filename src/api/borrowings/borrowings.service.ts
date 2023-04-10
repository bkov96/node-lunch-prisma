import { Injectable } from '@nestjs/common';
import { Prisma, Borrowing as PrismaBorrowing } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

export type PrismaBorrowingWithBookTitles = Prisma.BorrowingGetPayload<{
  include: { books: { select: { title: true } } };
}>;

@Injectable()
export class BorrowingsService {
  constructor(private readonly prisma: PrismaService) {}

  createNewBorrowing(bookIds: string[]): Promise<PrismaBorrowing> {
    const bookIdConnectInputs = bookIds.map((bookId) => ({
      id: bookId,
    }));

    return this.prisma.borrowing.create({
      data: { books: { connect: bookIdConnectInputs } },
    });
  }

  findAllBorrowingsWithBookTitles(): Promise<PrismaBorrowingWithBookTitles[]> {
    return this.prisma.borrowing.findMany({
      include: { books: { select: { title: true } } },
    });
  }
}
