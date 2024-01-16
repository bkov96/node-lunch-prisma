import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookWithCategoryRequestDto } from './dto/create-book-with-category.request.dto';
import { UpdateBookCategoryRequestDto } from './dto/update-book-category.request.dto';
import { BookResponseDto } from './dto/book.response.dto';
import { SerializationGroup } from 'src/common/enums/serialization-group.enum';

@ApiTags('books')
@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiResponse({ type: BookResponseDto })
  @Post()
  @SerializeOptions({ groups: [SerializationGroup.LCM_TIMESTAMP, SerializationGroup.INCLUDE_RELATIONS] })
  async createNewWithCategory(@Body() { categoryName, title, author, isBestSeller }: CreateBookWithCategoryRequestDto): Promise<BookResponseDto> {
    const createdBook = await this.booksService.createWithCategory(categoryName, title, author, isBestSeller);
    return BookResponseDto.mapEntity(createdBook);
  }

  @ApiResponse({ type: BookResponseDto })
  @Patch(':id')
  @SerializeOptions({ groups: [SerializationGroup.INCLUDE_RELATIONS] })
  async updateOrCreateBookCategory(@Param('id') id: string, @Body() { categoryName }: UpdateBookCategoryRequestDto): Promise<BookResponseDto> {
    const updatedBook = await this.booksService.updateBookCategory(id, categoryName);
    return BookResponseDto.mapEntity(updatedBook);
  }

  @ApiResponse({ type: BookResponseDto, isArray: true })
  @Get()
  @SerializeOptions({})
  async findMany(): Promise<BookResponseDto[]> {
    const foundBooks = await this.booksService.findMany();
    return BookResponseDto.mapEntities(foundBooks);
  }
}
