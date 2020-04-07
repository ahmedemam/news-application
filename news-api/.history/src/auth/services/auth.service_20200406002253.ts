import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';
import { JwtService } from '@nestjs/jwt';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationStatus } from '../interfaces/registration-status.interface';
import { debug } from 'console';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateUserDTO } from 'src/user/create-user.dto';
import * as Cryptr from 'cryptr';
import BECRYPT from 'bcrypt';
import { Constants } from '../constant/constants';

@Injectable()
export class AuthService {
    cryptr: any;
    constructor(private userService: UserService, private jwtService: JwtService,
        @InjectModel('User') private readonly userModel: PassportLocalModel<User>) {
        this.cryptr = new Cryptr(Constants.ENCRYPT_JWT_SECRET);
    }



    public async register(createUserDTO: CreateUserDTO) {
        let status: RegistrationStatus = { success: true, message: 'user registered successfylly' };
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

    public createToken(user: User) {
        const expiresIn = Constants.JWT_EXPIRATION;
        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            username: user.username,
        }, Constants.JWT_SECRET,  { expiresIn });
        return { accessToken};
    }


    public async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.getUser(payload._id);
    }

    public validateUserPassword(password, user: User){

    }
}
