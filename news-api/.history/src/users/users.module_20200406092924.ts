import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [],
  providers: [UserService]
})
export class UsersModule { }
