import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDB } from './init';

async function bootstrap() {
  await initDB(); 
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Servidor rodando em http://localhost:3000');
}

bootstrap();


