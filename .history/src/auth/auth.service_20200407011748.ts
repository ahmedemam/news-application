import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;


@Injectable()
export class AuthService {
    constructor(private usersService: UserService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        const hashedPassword = 
  }


    comparePassword(candidatePassword, userPassword) {
    }
}
