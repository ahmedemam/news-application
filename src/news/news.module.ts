import { Module, HttpModule } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'qpkz$%%$%^76782020',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    UserModule,
    HttpModule
  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
