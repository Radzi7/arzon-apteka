import { ApiProperty } from '@nestjs/swagger';
import {
  DataType,
  Table,
  Model,
  Column,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class Users extends Model<Users> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'User', description: "User's name" })
  @Column({ type: DataType.STRING })
  user_name: string;

  @ApiProperty({ example: '991234567', description: "User's phone number" })
  @Column({ type: DataType.STRING })
  user_phone: string;

  @ApiProperty({ example: '123456', description: "User's password" })
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({ example: '10.07.1994', description: "User's birthday" })
  @Column({ type: DataType.STRING })
  birthday: string;

  @ApiProperty({ example: 'Male', description: "User's gender" })
  @Column({ type: DataType.STRING })
  gender: string;

  @Column({ type: DataType.BOOLEAN })
  is_admin: boolean;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;

  @Column({ type: DataType.STRING, defaultValue: 'USER' })
  role: string;
}
