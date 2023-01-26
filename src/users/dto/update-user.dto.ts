import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'User', description: "User's name" })
  @IsString()
  user_name: string;
  @ApiProperty({ example: '991234567', description: "User's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  user_phone: string;

  @ApiProperty({ example: '10.07.1994', description: "User's birthday" })
  @IsString()
  brithday: string;
  @ApiProperty({ example: 'Male', description: "User's gender" })
  @IsString()
  gender: string;
  @IsOptional()
  @IsBoolean()
  is_admin: boolean;
}
