import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class BorrowingsService {
  constructor(private readonly prisma: PrismaService) {}
}
