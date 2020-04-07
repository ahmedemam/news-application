import { Controller, Post, Body, Res, HttpStatus, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from 'src/user/user-login.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/user/create-user.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService, private userService: UserService) {}

    @Post('/login') 
    async login(@Body() loginUser: UserLoginDTO){
        return await this.authService.validateUserByPassword(loginUser);
    }

    @Post('/register')
    async register(@Res() response, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return response.status(HttpStatus.OK).json({ user });
    }

    @Get('/logout')
    async logout(@Req() request) {
    }
    
}
