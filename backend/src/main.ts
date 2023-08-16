import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as https from 'https';
import { AccessTokenGuard } from './auth/common/guards';

async function bootstrap() {
  dotenv.config(); // Pour lire les variables du .env sans les dévoiler
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const reflector = new Reflector()
  app.useGlobalGuards(new AccessTokenGuard(reflector))
  app.use(
    cors({
      origin: ['http://localhost:8080', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();