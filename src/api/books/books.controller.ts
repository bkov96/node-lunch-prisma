import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService, PrismaBookWithCategory } from './books.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookWithCategoryDto } from './dto/create-book-with-category.dto';
import { Book as PrismaBook } from '@prisma/client';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // 1. Demonstrate entity creation with relation
  @Post()
  async createNewWithCategory(@Body() createBookWithCategoryDto: CreateBookWithCategoryDto): Promise<PrismaBook> {
    return await this.booksService.createWithCategory(createBookWithCategoryDto);
  }

  // 2. Demonstrate entity update with relation
  @Patch(':id')
  async updateOrCreateBookCategory(@Param('id') id: string, @Body() { categoryName }: UpdateBookCategoryDto): Promise<PrismaBook> {
    return await this.booksService.updateBookCategory(id, categoryName);
  }

  // 3. Demonstrate entity query with relation
  //    - utilizing generated nested type
  @Get()
  async findAllBooksWithCategories(): Promise<PrismaBookWithCategory[]> {
    return await this.booksService.findAllBooksWithCategories();
  }
}
