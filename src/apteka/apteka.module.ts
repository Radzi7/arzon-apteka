import { Module } from '@nestjs/common';
import { AptekaService } from './apteka.service';
import { AptekaController } from './apteka.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Apteka } from './apteka.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Apteka]), JwtModule],
  controllers: [AptekaController],
  providers: [AptekaService],
  exports: [AptekaService],
})
export class AptekaModule {}
