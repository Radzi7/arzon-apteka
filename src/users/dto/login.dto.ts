import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';
export class loginUserDto {
  @ApiProperty({ example: '123456', description: "Admin's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  readonly password: string;
  @ApiProperty({ example: '991234567', description: "Admin's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  readonly user_phone: string;
}
