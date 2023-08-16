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
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('/app/certificates/server.key'),
      cert: fs.readFileSync('/app/certificates/server.crt'),
      passphrase: 'coucou' // ouais gros mdp mais c'est des certif perso donc osef un peu
    },
  });
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
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();