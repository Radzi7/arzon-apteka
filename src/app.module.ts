import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoriModule } from './dori/dori.module';
import { AptekaModule } from './apteka/apteka.module';
import { UsersModule } from './users/users.module';
import { Apteka } from './apteka/apteka.model';
import { Dori } from './dori/dori.model';
import { Users } from './users/users.model';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Apteka,Dori,Users],
      autoLoadModels: true,
      logging: false,
    }),
    DoriModule,
    AptekaModule,
    UsersModule,
    AdminModule,
    
  ],
})
export class AppModule {}
