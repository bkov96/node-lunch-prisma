import { Controller } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';

@Controller('borrowings')
export class BorrowingsController {
  constructor(private readonly borrowingsService: BorrowingsService) {}
}
