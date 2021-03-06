import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from 'src/user/user-login.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/user/user.interface';
const SALT_WORK_FACTOR = 10;


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    public async createUser(createUserDTO: CreateUserDTO): Promise<any> {
        let user = await this.userService.createUser(createUserDTO);
        if (user) {
            const token = this.createJwtPayload(user);
            user.access_token = token.token;
            const updatedUser = this.userService.editUser(user._id, user);
            return updatedUser;
        }
        return new BadRequestException();

    }


    public async validateUserByPassword(loginUser: UserLoginDTO) {
        let user = await this.userService.getUserByEmail(loginUser.email);
        if (user) {
            const isVaidatedPassword = await this.comparePassword(loginUser.password, user.password);
            if (isVaidatedPassword) {
                const token = await this.createJwtPayload(user);
                if(token){
                    user.access_token = token.token;
                }
                return await this.userService.editUser(user._id, user);
            }
            return new UnauthorizedException();
        }
        return new UnauthorizedException();
    }

    public async validateUserByJwt(payload: JwtPayload) {
        const user = await this.userService.getUserByEmail(payload.email);
        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }


    private createJwtPayload(user: User) {
        const jwtPayload: JwtPayload = {
            _id: user._id,
            email: user.email
        };
        return {
            expiresIn: '1h',
            token: this.jwtService.sign(jwtPayload)
        }
    }

    private comparePassword(attemptPassword, userPassword): boolean {
        if (bcrypt.compareSync(attemptPassword, userPassword)) return true;
        return false;
    }

}


