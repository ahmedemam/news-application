import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Constants } from './constant/constants';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: Constants.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [AuthController]
})
export class AuthModule { }
