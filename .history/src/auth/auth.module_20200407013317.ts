import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
// import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secretOrPrivateKey: 'thisismykickasssecretthatiwilltotallychangelater',
      signOptions: {
        expiresIn: 3600
      }
    }),
    UserModule
  ],
  controllers: [],
  providers: [AuthService]
})
export class AuthModule {}


