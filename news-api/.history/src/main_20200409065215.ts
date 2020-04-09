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
  app.use(helmet.hidePoweredBy()); 
  app.use(helmet.noCache({ noEtag: true })); 
  app.use(helmet.noSniff());    
  app.use(helmet.frameguard()); 
  app.use(helmet.xssFilter());
  app.enableCors();
  app.use(cookieParser());
  app.use(session({
    secret: 'newsapp',
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    secure: false
  }));
  // TODO GOT A PROBLEM IN POST REQUESTS: TRYING TO FIGURE OUT....
  // app.use(csurf({ cookie: true }));
  // app.use(function (req, res, next) {
  //   res.cookie('XSRF-TOKEN', req.csrfToken());
  //   next();
  // });
  app.use(compression());
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));
  await app.listen(3000);
}
bootstrap();
