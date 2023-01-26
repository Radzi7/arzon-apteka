import { PartialType } from '@nestjs/swagger';
import { CreateAptekaDto } from './create-apteka.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';
export class UpdateAptekaDto extends PartialType(CreateAptekaDto) {
  @ApiProperty({
    example: 'Arzon-Apteka',
    description: 'Name of pharmacy',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: '08:00-18:00',
    description: 'Working time of pharmacy',
  })
  @IsString()
  working_time: string;
  @ApiProperty({
    example: "Navoiy ko'chasi 15-uy 8-kvartira",
    description: 'Exactly address of pharmacy',
  })
  @IsString()
  address: string;
  @ApiProperty({
    example: 'Marko supermarketi yaqinida',
    description: 'Approximately address of pharmacy',
  })
  @IsString()
  orientir: string;
  @ApiProperty({ example: '991234567', description: "Admin's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;
  @ApiProperty({
    example: '5',
    description: 'Mark to pharmacy',
  })
  @IsString()
  mark: string;
  @ApiProperty({
    example: 'url:"https://arzon-apteka.png"',
    description: 'URL to photo of pharmacy',
  })
  @IsString()
  photo: string;
  @ApiProperty({
    example: '41.33468174788559, 69.32111234608462',
    description: 'Longitude and Latitude of location',
  })
  @IsString()
  location: string;
}
