import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CategoryResponseDto } from 'src/api/categories/dto/category.response.dto';
import { PrismaBook, PrismaBookWithCategory } from '../books.repository';
import { SerializationGroup } from 'src/common/enums/serialization-group.enum';

export class BookResponseDto {
  @ApiProperty({ example: '798d3f9c-6e80-47b3-86dc-d86fb1861653' })
  id: string;

  @ApiPropertyOptional({ example: '2021-08-14T08:50:03.000Z' })
  @Expose({ groups: [SerializationGroup.LCM_TIMESTAMP] })
  createdAt: string;

  @ApiPropertyOptional({ example: '2021-08-14T08:50:03.000Z' })
  @Expose({ groups: [SerializationGroup.LCM_TIMESTAMP] })
  updatedAt: string;

  @ApiProperty({ example: 'Fire and Blood' })
  title: string;

  @ApiProperty({ example: 'George Raymond Richard Martin' })
  author: string;

  @ApiProperty({ example: true })
  isBestSeller: boolean;

  @ApiPropertyOptional({ type: CategoryResponseDto })
  @Expose({ groups: [SerializationGroup.INCLUDE_RELATIONS] })
  category: CategoryResponseDto | null;

  constructor(partial: Partial<BookResponseDto>) {
    Object.assign(this, partial);
  }

  static mapEntity(entity: PrismaBook | PrismaBookWithCategory): BookResponseDto {
    return new BookResponseDto({
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      title: entity.title,
      author: entity.author,
      isBestSeller: entity.isBestSeller,
      category: entity['category'] ? CategoryResponseDto.mapEntity(entity['category']) : null,
    });
  }

  static mapEntities(entities: any[]): BookResponseDto[] {
    return entities.map((entity) => this.mapEntity(entity));
  }
}
