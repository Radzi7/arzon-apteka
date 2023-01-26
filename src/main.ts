import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('NestJS TEST')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS,Postgres,sequalize')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    await app.listen(PORT, () => {
      console.log(`Server is running in ${PORT} port`);
    });
  } catch (error) {}
};
start();
