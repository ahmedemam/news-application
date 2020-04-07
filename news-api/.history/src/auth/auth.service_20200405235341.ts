import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';
import { JwtService } from '@nestjs/jwt';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationStatus } from './registration-status.interface';
import { debug } from 'console';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDTO } from 'src/user/create-user.dto';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,
        @InjectModel('User') private readonly userModel: PassportLocalModel<User>) { }



    async register(createUserDTO: CreateUserDTO) {
        let status: RegistrationStatus = { success: true, message: 'user registered' };
        await this.userModel.register(new this.userModel({
            email: createUserDTO.email,
            username: createUserDTO.username
        }), createUserDTO.password, (error) => {
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
        return {
            expiresIn,
            accessToken,
        };
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.getUser(payload._id);
    }
}
