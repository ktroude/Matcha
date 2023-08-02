import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // Importez le package dotenv

async function bootstrap() {
  
  dotenv.config(); // Pour lire les variables du .env sans les dévoiler
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
  