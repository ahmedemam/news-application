import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;


@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user && user.password) {
            const userVaidateStatus = bcrypt.compare(password, user.password, (error, result)=>{
                return result;
            }) 
        }
        return null;
    }
}
