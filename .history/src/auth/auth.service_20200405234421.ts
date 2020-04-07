import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';
import { JwtService } from '@nestjs/jwt';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationStatus } from './registration-status.interface';
import { debug } from 'console';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,
        @InjectModel('User') private readonly userModel: PassportLocalModel<User>) { }



    async register(user: User) {
        let status: RegistrationStatus = { success: true, message: 'user registered' };
        await this.userModel.register(new this.userModel({
            email: user.email,
            username: user.username
        }), user.password, (error) => {
            if (error) {
                debug(error);
                status = { success: false, message: error };
            }
        });
        return status;
    }

    createToken(user: User) {
        const expiresIn = 3600;
        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            username: user.username,
        }, 'newsapp', { expiresIn });
        console.log('return the token');
        console.log(accessToken);
        return {
            expiresIn,
            accessToken,
        };
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findById(payload.id);
    }

    // public async login(email: string, password: string): Promise<any> {
    //     const user = await this.userService.getUserByEmail(email);
    //     if (user && user.password === password) {
    //         return user;
    //     }
    //     if(!user){
    //         return { status: 404 };
    //       }
    //       const payload = `${user.username}${user._id}`;
    //       const accessToken = this.jwtService.sign(payload);

    //       return {
    //          access_token: accessToken,
    //          user_id: payload,
    //          status: 200
    //       };
    //     return null;
    // }

    // public async register(user: User): Promise<any>{
    //     return this.userService.addUser(user)
    // } 

}
