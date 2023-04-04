import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags } from '@nestjs/swagger';

/*
    Books
    - Demonstrate simple Create and Read operations
    - Demonstrate simple Update and Delete operations
*/

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
}
