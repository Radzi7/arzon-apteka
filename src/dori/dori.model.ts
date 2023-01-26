import { ApiProperty } from '@nestjs/swagger';
import {
  DataType,
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Apteka } from 'src/apteka/apteka.model';

@Table({ tableName: 'dori' })
export class Dori extends Model<Dori> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Aspirine', description: 'Name of medicine' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: 'Turkiye', description: 'Country manufacturer' })
  @Column({ type: DataType.STRING })
  prod_country: string;

  @ApiProperty({ example: 'Pfizer', description: 'Manufacturer company' })
  @Column({ type: DataType.STRING })
  prod_company: string;

  @ApiProperty({ example: '10 000', description: 'Price of medicine' })
  @Column({ type: DataType.INTEGER })
  price: number;

  @ApiProperty({ example: '3', description: 'Count of analogs' })
  @Column({ type: DataType.INTEGER })
  analogs: number;

  @ForeignKey(() => Apteka)
  @Column({ type: DataType.INTEGER })
  apteka_id: number;
  @BelongsTo(() => Apteka)
  apteka: Apteka[];
}
