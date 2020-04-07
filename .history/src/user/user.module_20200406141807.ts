import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
