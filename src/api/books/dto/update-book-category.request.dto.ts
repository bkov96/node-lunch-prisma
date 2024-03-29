import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateBookCategoryRequestDto {
  @ApiProperty({ example: 'sci-fi' })
  @IsString()
  @Length(1, 30)
  categoryName: string;
}
