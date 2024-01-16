import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateBookWithCategoryRequestDto {
  @ApiProperty({ example: 'Fire and Blood' })
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty({ example: 'George Raymond Richard Martin' })
  @IsString()
  @Length(1, 100)
  author: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isBestSeller?: boolean;

  @ApiProperty({ example: 'fantasy' })
  @IsString()
  @Length(1, 30)
  categoryName: string;
}
