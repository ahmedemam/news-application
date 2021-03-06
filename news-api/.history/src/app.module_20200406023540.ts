import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/newsdb', { useNewUrlParser: true }), NewsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
