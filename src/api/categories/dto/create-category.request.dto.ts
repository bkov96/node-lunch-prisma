import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
export class CreateCategoryRequestDto {
  @ApiProperty({ example: 'fantasy' })
  @IsString()
  @Length(1, 30)
  name: string;
}
