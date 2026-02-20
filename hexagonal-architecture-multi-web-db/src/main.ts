import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/configuration/app.module';
import process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
