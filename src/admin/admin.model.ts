import { ApiProperty } from '@nestjs/swagger';
import { DataType, Table, Model, Column, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Admin', description: "Admin's name" })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: '123456', description: "Admin's password" })
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Admins email address',
  })
  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;

  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;

  @Column({ type: DataType.STRING, defaultValue: 'ADMIN' })
  role: string;
}
