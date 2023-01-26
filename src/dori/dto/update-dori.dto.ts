import { PartialType } from '@nestjs/swagger';
import { CreateDoriDto } from './create-dori.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDoriDto extends PartialType(CreateDoriDto) {
  @ApiProperty({ example: 'Aspirine', description: 'Name of medicine' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'Turkiye', description: 'Country manufacturer' })
  @IsString()
  prod_country: string;
  @ApiProperty({ example: 'Pfizer', description: 'Manufacturer company' })
  @IsString()
  prod_company: string;
  @ApiProperty({ example: '10 000', description: 'Price of medicine' })
  @IsNumber()
  price: number;
  @ApiProperty({ example: '3', description: 'Count of analogs' })
  @IsNumber()
  analogs: number;
  @IsOptional()
  @IsNumber()
  apteka_id: number;
}
