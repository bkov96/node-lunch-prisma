import { Module } from '@nestjs/common';
import { CategoriesModule } from './api/categories/categories.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { BooksModule } from './api/books/books.module';
import { BorrowingsModule } from './api/borrowings/borrowings.module';

@Module({
  imports: [CategoriesModule, PrismaModule, BooksModule, BorrowingsModule],
})
export class AppModule {}
