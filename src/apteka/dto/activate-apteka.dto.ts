import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString, Length, MinLength } from "class-validator";

export class ActivateAptekaDto {
  @ApiProperty({ example: 'name1', description: 'Admin name' })
  @IsString({ message: 'Pharmacy name must be a string' })
  readonly name: string;

  @ApiProperty({ example: '123456', description: "Admin's password" })
  @IsString()
  @Length(5, 15, {
    message: "Parolning uzunligi 5 dan katta 15 dan kichik bo'lishi kerak",
  })
  readonly password: string;

  @ApiProperty({ example: '991234567', description: "Admin's phone number" })
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone: string;
}