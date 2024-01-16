import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BorrowingsService, PrismaBorrowingWithBookCategories, PrismaBorrowingWithBookTitles } from './borrowings.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNewBorrowingDto } from './dto/create-new-borrowing.dto';
import { Borrowing as PrismaBorrowing } from '@prisma/client';

@ApiTags('borrowings')
@Controller('borrowings')
export class BorrowingsController {
  constructor(private readonly borrowingsService: BorrowingsService) {}

  // 1. Demonstrate entity creation with multiple relation
  @Post()
  async createNewBorrowing(@Body() { bookIds }: CreateNewBorrowingDto): Promise<PrismaBorrowing> {
    return this.borrowingsService.createNewBorrowing(bookIds);
  }

  // 2. Demonstrate entity query with multiple relation
  //    - utilizing generated nested type
  @Get()
  async findAllBorrowingsWithBookTitles(): Promise<PrismaBorrowingWithBookTitles[]> {
    return this.borrowingsService.findAllBorrowingsWithBookTitles();
  }

  // 3. Demonstrate entity query using relation filter
  @Get('includes-category/:categoryId')
  async findAllBorrowingsIncludesCategory(@Param('categoryId') categoryId: string): Promise<PrismaBorrowingWithBookCategories[]> {
    return this.borrowingsService.findAllBorrowingsIncludesCategory(categoryId);
  }
}
