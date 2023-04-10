import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookWithCategoryDto } from './dto/create-book-with-category.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // 1. Demonstrate entity creation with relation
  @Post()
  async createNewWithCategory(
    @Body() createBookWithCategoryDto: CreateBookWithCategoryDto,
  ): Promise<unknown> {
    return await this.booksService.createWithCategory(
      createBookWithCategoryDto,
    );
  }
}
