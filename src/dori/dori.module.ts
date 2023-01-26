import { Module } from '@nestjs/common';
import { DoriService } from './dori.service';
import { DoriController } from './dori.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dori } from './dori.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Dori]),JwtModule],
  controllers: [DoriController],
  providers: [DoriService],
  exports: [DoriService],
})
export class DoriModule {}
