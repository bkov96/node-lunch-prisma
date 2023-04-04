import { Controller } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { ApiTags } from '@nestjs/swagger';

/*
    Borrowings
    - Demonstrate simple Create and Read operations
    - Demonstrate more complex Read operations (relational queries)
*/

@ApiTags('borrowings')
@Controller('borrowings')
export class BorrowingsController {
  constructor(private readonly borrowingsService: BorrowingsService) {}
}
