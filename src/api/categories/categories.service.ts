import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoriesRepository, PrismaCategory } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createByName(name: string): Promise<PrismaCategory> {
    const existingCategory = await this.categoriesRepository.findByName(name);

    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    try {
      return this.categoriesRepository.category.create({ data: { name } });
    } catch (error) {
      console.error(error);
      throw InternalServerErrorException;
    }
  }

  async findMany(): Promise<PrismaCategory[]> {
    try {
      return await this.categoriesRepository.category.findMany();
    } catch (error) {
      console.error(error);
      throw InternalServerErrorException;
    }
  }

  async findById(id: string): Promise<PrismaCategory> {
    const foundCategory = await this.categoriesRepository.findById(id);

    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    return foundCategory;
  }

  async findByName(name: string): Promise<PrismaCategory> {
    const foundCategory = await this.categoriesRepository.findByName(name);

    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    return foundCategory;
  }
}
