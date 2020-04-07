import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/newsdb', { useNewUrlParser: true }), AuthenticationModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
