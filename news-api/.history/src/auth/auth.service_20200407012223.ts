import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;


@Injectable()
export class AuthService {
    // constructor(private usersService: UserService) { }

}
