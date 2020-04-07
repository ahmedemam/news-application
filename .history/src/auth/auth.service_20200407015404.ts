import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    public async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user && user.password) {
            const userVaidateStatus = bcrypt.compare(password, user.password, (error, result) => {
                if (error) return error;
                return result;
            })
            return userVaidateStatus ? user : false;
        }
        return false;
    }


    public async validateUserByPassword(userLoginDTO: UserLoginDTO) {

        const attemptUser = await this.userService.getUserByEmail(userLoginDTO.email);
        return new Promise((resolve) => {
            attemptUser.checkPassword(userLoginDTO.password, (err, isMatch) => {
                if (err) throw new UnauthorizedException();
                if (isMatch) {
                    resolve(this.createJwtPayload(attemptUser));

                } else {
                    throw new UnauthorizedException();
                }

            });

        });

    }

    public async validateUserByJwt(payload: JwtPayload) {
        const user = await this.userService.getUserByEmail(payload.email);
        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    public async createNewUser(createUserDTO: CreateUserDTO) {
        return await this.userService.createUser(createUserDTO);
    }


    private createJwtPayload(user: User) {
        const jwtPayload: JwtPayload = {
            _id: user._id,
            email: user.email
        };
        return {
            expiresIn: 3600,
            token: this.jwtService.sign(jwtPayload)
        }
    }

    private comparePassword(attemptPassword, userPassword): boolean {
        if (bcrypt.compareSync(attemptPassword, userPassword)) return true;
        return false;
    }

}


// @UseGuards(AuthGuard())