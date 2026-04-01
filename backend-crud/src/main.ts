//O main.ts é o ponto de entrada da aplicação. Ele é responsável por iniciar o servidor
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
 await app.listen(3000);
  
}
bootstrap();
