import { Body, Controller, Post } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNewBorrowingDto } from './dto/create-new-borrowing.dto';
import { Borrowing as PrismaBorrowing } from '@prisma/client';

@ApiTags('borrowings')
@Controller('borrowings')
export class BorrowingsController {
  constructor(private readonly borrowingsService: BorrowingsService) {}

  @Post()
  async createNewBorrowing(
    @Body() { bookIds }: CreateNewBorrowingDto,
  ): Promise<PrismaBorrowing> {
    return this.borrowingsService.createNewBorrowing(bookIds);
  }
}
