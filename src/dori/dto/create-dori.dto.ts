import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDoriDto {
  @ApiProperty({ example: 'Aspirine', description: 'Name of medicine' })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: 'Turkiye', description: 'Country manufacturer' })
  @IsString()
  readonly prod_country: string;
  @ApiProperty({ example: 'Pfizer', description: 'Manufacturer company' })
  @IsString()
  readonly prod_company: string;
  @ApiProperty({ example: '10 000', description: 'Price of medicine' })
  @IsNumber()
  readonly price: number;
  @ApiProperty({ example: '3', description: 'Count of analogs' })
  @IsNumber()
  readonly analogs: number;
  @IsOptional()
  @IsNumber()
  readonly apteka_id: number;
}
