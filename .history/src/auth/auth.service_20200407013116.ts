import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/create-user.dto';
const SALT_WORK_FACTOR = 10;


@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

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


    public async createNewUser(createUserDTO: CreateUserDTO){
        return await this.userService.createUser(createUserDTO)
    }
}


// @UseGuards(AuthGuard())