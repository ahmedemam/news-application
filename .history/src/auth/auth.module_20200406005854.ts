import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Constants } from './constant/constants';
import { UserService } from 'src/user/service/user.service';

@Module({
  providers: [AuthService, JwtStrategy, JwtService, UserService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: Constants.JWT_SECRET,
      signOptions: { expiresIn: Constants.JWT_EXPIRATION }
    }),
  ],
  controllers: [AuthController]
})
export class AuthModule { }
