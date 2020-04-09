import { Module, HttpModule } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { UserController } from 'src/user/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
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
