import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
export class loginDto {
  @ApiProperty({ example: '123456', description: "Admin's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  readonly password: string;
  @ApiProperty({
    example: 'admin@mail.com',
    description: "Admin's email address",
  })
  @IsEmail({}, { message: "Email noto'g'ri kiritilgan" })
  readonly email: string;
}
