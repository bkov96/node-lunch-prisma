import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PrismaCategory } from '../categories.repository';
import { SerializationGroup } from 'src/common/enums/serialization-group.enum';

export class CategoryResponseDto {
  @ApiProperty({ example: '798d3f9c-6e80-47b3-86dc-d86fb1861653' })
  id: string;

  @ApiProperty({ example: 'fantasy' })
  name: string;

  @ApiPropertyOptional({ example: '2021-08-14T08:50:03.000Z' })
  @Expose({ groups: [SerializationGroup.LCM_TIMESTAMP] })
  createdAt: string;

  @ApiPropertyOptional({ example: '2021-08-14T08:50:03.000Z' })
  @Expose({ groups: [SerializationGroup.LCM_TIMESTAMP] })
  updatedAt: string;

  constructor(partial: Partial<CategoryResponseDto>) {
    Object.assign(this, partial);
  }

  static mapEntity(entity: PrismaCategory): CategoryResponseDto {
    return new CategoryResponseDto({
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
    });
  }

  static mapEntities(entities: PrismaCategory[]): CategoryResponseDto[] {
    return entities.map((entity) => this.mapEntity(entity));
  }
}
