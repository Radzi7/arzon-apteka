import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, Length } from 'class-validator';
export class CreateAdminDto {
  @ApiProperty({ example: 'admin', description: "Admin's first name" })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '123456', description: "Admin's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  readonly password: string;
  @ApiProperty({example: 'admin@gmail.com',description: "Admin's email address"})
  @IsEmail({}, { message: "Email noto'g'ri kiritilgan" })
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly hashed_refresh_token: string;
  @IsOptional()
  @IsBoolean()
  readonly is_active: boolean;
}
