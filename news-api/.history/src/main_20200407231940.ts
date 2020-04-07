import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as bodyParser from 'body-parser';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as cookieParser from 'cookieParser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser())
  app.use(csurf());
  app.use(compression());
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));
  await app.listen(3000);
}
bootstrap();
