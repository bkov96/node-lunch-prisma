import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateNewBorrowingDto {
  @ApiProperty({ isArray: true, type: String, example: [] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  bookIds: string[];
}
