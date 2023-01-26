import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  isString,
  IsString,
  Length,
} from 'class-validator';
export class CreateAptekaDto {
  @ApiProperty({
    example: 'Arzon-Apteka',
    description: 'Name of pharmacy',
  })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '123456', description: "Admin's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  readonly password: string;
  @ApiProperty({
    example: '08:00-18:00',
    description: 'Working time of pharmacy',
  })
  @IsOptional()
  @IsString()
  readonly working_time: string;
  @ApiProperty({
    example: "Navoiy ko'chasi 15-uy 8-kvartira",
    description: 'Exactly address of pharmacy',
  })
  @IsOptional()
  @IsString()
  readonly address: string;
  @ApiProperty({
    example: 'Marko supermarketi yaqinida',
    description: 'Approximately address of pharmacy',
  })
  @IsOptional()
  @IsString()
  readonly orientir: string;
  @ApiProperty({ example: '991234567', description: "Admin's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone: string;
  @IsOptional()
  @IsBoolean()
  readonly delivery_is_active: boolean;
  @ApiProperty({
    example: '5',
    description: 'Mark to pharmacy',
  })
  @IsOptional()
  @IsString()
  readonly mark: string;
  @ApiProperty({
    example: 'url:"https://arzon-apteka.png"',
    description: 'URL to photo of pharmacy',
  })
  @IsOptional()
  @IsString()
  readonly photo: string;
  @ApiProperty({
    example: '41.33468174788559, 69.32111234608462',
    description: 'Longitude and Latitude of location',
  })
  @IsOptional()
  @IsString()
  readonly location: string;
  @IsOptional()
  @IsBoolean()
  readonly is_active: boolean;
  @IsOptional()
  @IsString()
  readonly hashed_refresh_token: string;
}
