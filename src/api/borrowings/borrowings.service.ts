import { Injectable } from '@nestjs/common';
import { Borrowing as PrismaBorrowing } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

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
}
