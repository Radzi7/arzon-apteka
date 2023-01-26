import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'User', description: "User's name" })
  @IsString()
  readonly user_name: string;
  @ApiProperty({ example: '991234567', description: "User's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  readonly user_phone: string;
  @ApiProperty({ example: '123456', description: "User's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  readonly password: string;
  @ApiProperty({ example: '10.07.1994', description: "User's birthday" })
  @IsString()
  readonly brithday: string;
  @ApiProperty({ example: 'Male', description: "User's gender" })
  @IsString()
  readonly gender: string;
  @IsOptional()
  @IsBoolean()
  readonly is_admin: boolean;
  @IsOptional()
  @IsString()
  readonly hashed_refresh_token: string;
}
