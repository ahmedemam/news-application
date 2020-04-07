import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService],
  imports: [UserModule, PassportModule]
})
export class AuthModule {}
