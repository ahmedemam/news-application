import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from 'src/user/user-login.dto';
const SALT_WORK_FACTOR = 10;


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    public async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user && user.password) {
            const userVaidateStatus = bcrypt.compare(password, user.password, (error, result)=>{
                if(error) return error;
                return result;                
            }) 
            return userVaidateStatus ? user : false;
        }
        return false;
    }


    async validateUserByPassword(userLoginDTO: UserLoginDTO) {

        let userToAttempt = await this.userService.findOneByEmail(userLoginDTO.email);
        
        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(userLoginDTO.password, (err, isMatch) => {
                if(err) throw new UnauthorizedException();
    
                if(isMatch){
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));
    
                } else {
                    throw new UnauthorizedException();
                }
    
            });

        });

    }

    public async createNewUser(createUserDTO: CreateUserDTO){
        return await this.userService.createUser(createUserDTO);
    }
}


// @UseGuards(AuthGuard())