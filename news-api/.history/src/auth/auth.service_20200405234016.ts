import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';
import { JwtService } from '@nestjs/jwt';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,
        @InjectModel('User') private readonly userModel: PassportLocalModel<User>) { }

    public async login(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        if(!user){
            return { status: 404 };
          }
          const payload = `${user.username}${user._id}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             access_token: accessToken,
             user_id: payload,
             status: 200
          };
        return null;
    }

    public async register(user: User): Promise<any>{
        return this.userService.addUser(user)
    } 

}
