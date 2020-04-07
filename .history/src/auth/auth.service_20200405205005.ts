import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
