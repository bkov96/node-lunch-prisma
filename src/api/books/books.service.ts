import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BooksRepository, PrismaBook } from './books.repository';
import { PrismaBookWithCategory } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async createWithCategory(categoryName: string, title: string, author: string, isBestSeller?: boolean): Promise<PrismaBookWithCategory> {
    try {
      return await this.booksRepository.createWithCategory(categoryName, { title, author, isBestSeller });
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }

  async updateBookCategory(id: string, categoryName: string): Promise<PrismaBookWithCategory> {
    try {
      return await this.booksRepository.updateOrCreateBookCategory(id, categoryName);
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }

  async findMany(): Promise<PrismaBook[]> {
    try {
      return await this.booksRepository.book.findMany();
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }
}
