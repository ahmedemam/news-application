import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'qpkz$%%$%^76782020'
        });

    }

    async validate(payload: JwtPayload){
        const user = await this.authService.validateUserByJwt(payload);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}