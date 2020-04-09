import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as bodyParser from 'body-parser';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(helmet.hidePoweredBy({ setTo: 'DummyServer 1.0' })); //change value of X-Powered-By header to given value
  app.use(helmet.noCache({ noEtag: true })); //set Cache-Control header
  app.use(helmet.noSniff());    // set X-Content-Type-Options header
  app.use(helmet.frameguard()); // set X-Frame-Options header
  app.use(helmet.xssFilter());  // set X-XSS-Protection header
  app.enableCors();
  app.use(cookieParser());
  app.use(session({
    secret: 'newsapp',
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    secure: false
  }));
  app.use(csurf({ cookie: true }));
  app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
  app.use(compression());
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));
  await app.listen(3000);
}
bootstrap();
