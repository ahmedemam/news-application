import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { UserService } from './users/service/user.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/newsdb', { useNewUrlParser: true }), AuthModule, UsersModule, NewsModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule { }
