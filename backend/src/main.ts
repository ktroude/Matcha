import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as dotenv from 'dotenv'; // Importez le package dotenv
import { AccessTokenGuard } from './auth/common/guards';

async function bootstrap() {
  dotenv.config(); // Pour lire les variables du .env sans les dévoiler
  const app = await NestFactory.create(AppModule);
  const reflector = new Reflector()
  // app.useGlobalGuards(new AccessTokenGuard(reflector))
  app.use(
    cors({
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      // allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();