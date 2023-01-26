import { ApiProperty } from '@nestjs/swagger';
import { DataType, Table, Model, Column, HasMany } from 'sequelize-typescript';
import { Dori } from 'src/dori/dori.model';

@Table({ tableName: 'apteka' })
export class Apteka extends Model<Apteka> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ArzonA', description: 'Name of pharmacy' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: '123456', description: 'password of pharmacy' })
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({
    example: '08:00-18:00',
    description: 'Working time of pharmacy',
  })
  @Column({ type: DataType.STRING })
  working_time: string;

  @ApiProperty({
    example: "Navoiy ko'chasi 15-uy 8-kvartira",
    description: 'Exactly address of pharmacy',
  })
  @Column({ type: DataType.STRING })
  address: string;

  @ApiProperty({
    example: 'Marko supermarketi yaqinida',
    description: 'Approximately address of pharmacy',
  })
  @Column({ type: DataType.STRING })
  orientir: string;

  @ApiProperty({
    example: '991234567',
    description: "pharmacy's phone number",
  })
  @Column({ type: DataType.STRING })
  phone: string;

  //   @ForeignKey(() => Dori)
  //   @Column({ type: DataType.INTEGER })
  //   dori_id: number;
  //   @BelongsTo(() => Dori)
  //   dori: Dori[];

  @Column({ type: DataType.BOOLEAN })
  delivery_is_active: boolean;

  @ApiProperty({ example: '5', description: 'Mark to pharmacy' })
  @Column({ type: DataType.STRING })
  mark: string;

  @ApiProperty({
    example: 'url:"https://arzon-apteka.png"',
    description: 'URL to photo of pharmacy',
  })
  @Column({ type: DataType.STRING })
  photo: string;

  @ApiProperty({
    example: '41.33468174788559, 69.32111234608462',
    description: 'Longitude and Latitude of location',
  })
  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;

  @Column({ type: DataType.STRING, defaultValue: 'APTEKA' })
  role: string;

  @HasMany(() => Dori)
  Dori: Dori[];
}
