import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        if(!user){
            return { status: 404 };
          }
          const payload = `${user.username}${user._id}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: 3600,
             access_token: accessToken,
             user_id: payload,
             status: 200
          };
        return null;
    }

}
