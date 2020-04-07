import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [ControllerController, UserController],
  providers: [UserService]
})
export class UserModule {}
