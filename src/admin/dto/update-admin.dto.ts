import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiProperty({ example: 'admin', description: "Admin's first name" })
  @IsString()
  name: string;
  @ApiProperty({ example: '123456', description: "Admin's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  password: string;
  @ApiProperty({
    example: 'admin@gmail.com',
    description: "Admin's email address",
  })
  @IsEmail({}, { message: "Email noto'g'ri kiritilgan" })
  email: string;
  @IsOptional()
  @IsString()
  hashed_refresh_token: string;
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
