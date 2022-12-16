/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger/* , ValidationPipe */} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

import {AppModule} from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The «Blog» service')
    .setDescription('Blog service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  // приводит к ошибке: не считывает дефолтные значения page и commentsCount
  /* app.useGlobalPipes(new ValidationPipe({
    transform: true
  })); */

  const port = process.env.PORT || 3331;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
