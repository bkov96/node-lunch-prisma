import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryRequestDto } from './dto/create-category.request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category.response.dto';
import { SerializationGroup } from 'src/common/enums/serialization-group.enum';

@ApiTags('categories')
@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({ type: CategoryResponseDto })
  @Post()
  @SerializeOptions({})
  async createNew(@Body() { name }: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    const createdCategory = await this.categoriesService.createByName(name);
    return CategoryResponseDto.mapEntity(createdCategory);
  }

  @ApiResponse({ type: CategoryResponseDto, isArray: true })
  @Get()
  @SerializeOptions({})
  async findAllCategories(): Promise<CategoryResponseDto[]> {
    const foundCategories = await this.categoriesService.findMany();
    return CategoryResponseDto.mapEntities(foundCategories);
  }

  @ApiResponse({ type: CategoryResponseDto })
  @Get('by-id/:id')
  @SerializeOptions({ groups: [SerializationGroup.LCM_TIMESTAMP] })
  async findCategoryById(@Param('id') id: string): Promise<CategoryResponseDto> {
    const foundCategory = await this.categoriesService.findById(id);
    return CategoryResponseDto.mapEntity(foundCategory);
  }

  @ApiResponse({ type: CategoryResponseDto })
  @Get('by-name/:name')
  @SerializeOptions({ groups: [SerializationGroup.LCM_TIMESTAMP] })
  async findCategoriesByName(@Param('name') name: string): Promise<CategoryResponseDto> {
    const foundCategory = await this.categoriesService.findByName(name);
    return CategoryResponseDto.mapEntity(foundCategory);
  }
}
