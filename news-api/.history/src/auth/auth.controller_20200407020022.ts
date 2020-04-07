import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from 'src/user/user-login.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('/login') 
    async login(@Body() loginUser: UserLoginDTO){
        return await this.authService.validateUserByPassword(loginUser);
    }
}
