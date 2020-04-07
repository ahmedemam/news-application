import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';
import { JwtService } from '@nestjs/jwt';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationStatus } from './registration-status.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,
        @InjectModel('User') private readonly userModel: PassportLocalModel<User>) { }



        async register(user: User) {
            let status: RegistrationStatus = { success: true, message: 'user registered' };
            await this.userModel.register(new this.userModel({email: user.email,
                username: user.username}), user.password, (err) => {
                if (err) {
                    debug(err);
                    status = { success: false, message: err };
                }
            });
            return status;
        }
    
        createToken(user) {
            console.log('get the expiration');
            const expiresIn = 3600;
            console.log('sign the token');
            console.log(user);
    
            const accessToken = jwt.sign({ id: user.id,
                email: user.username,
                firstname: user.firstName,
                lastname: user.lastName }, 'ILovePokemon', { expiresIn });
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
