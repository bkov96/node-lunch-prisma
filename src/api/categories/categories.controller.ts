import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Category as PrismaCategory } from '@prisma/client';
import { ExcludeResponseFields } from 'src/common/interceptors/exclude-fields.interceptor';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoriesByNameDto } from './dto/find-categories-by-name.dto';

/*
    Categories
    - Demonstrate simple Create and Read operations
*/

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 1. Demonstrate general use-case of Prisma create
  //    - also utilize generated Prisma type for DTO
  //    - underlying service function works with multiple create DTOs
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

  // 3. Demonstrate use-case of excluding fields (createdAt, updatedAt)
  //    - using class-transformer
  //    - not really ideal, as generated types are not fully utilized
  @Get(':name')
  @UseInterceptors(ClassSerializerInterceptor)
  async findCategoriesByName(
    @Param('name') name: string,
  ): Promise<FindCategoriesByNameDto[]> {
    const categories = await this.categoriesService.findMany({
      where: { name },
    });

    return categories.map((category) => new FindCategoriesByNameDto(category));
  }

  // 4. Demonstrate use-case of excluding fields
  //    - using custom interceptor
  //    - ideal when using document first approach => OpenAPI, class-transformer decorators are not needed
  //    - exclude will be supported by Prisma sooner or later, see https://github.com/prisma/prisma/issues/5042
  @Get(':id')
  @UseInterceptors(
    ExcludeResponseFields<PrismaCategory>('createdAt', 'updatedAt'),
  )
  async findCategoryById(@Param('id') id: string): Promise<PrismaCategory> {
    return await this.categoriesService.findById(id);
  }
}
