import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/news', { useNewUrlParser: true }),
  PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  JwtModule.register({
    secretOrPrivateKey: 'qpkz$%%$%^76782020',
    signOptions: {
      expiresIn: 3600
    }
  }), , UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
