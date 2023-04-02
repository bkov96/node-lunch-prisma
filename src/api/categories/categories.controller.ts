import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category as PrismaCategory } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 1. Demonstrate general use-case of Prisma create
  @Post()
  async createNew(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<PrismaCategory> {
    return await this.categoriesService.createNew(createCategoryDto);
  }

  // 2. Demonstrate general use-case of Prisma findMany
  @Get()
  async findAllCategories(): Promise<PrismaCategory[]> {
    return await this.categoriesService.findMany();
  }
}
