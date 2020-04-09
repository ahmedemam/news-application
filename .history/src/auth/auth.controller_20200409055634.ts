import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from 'src/user/user-login.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/user/create-user.dto';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.interface';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService, private jwtStrategy: JwtStrategy) { }

    @Post('/login')
    public async login(@Body() loginUser: UserLoginDTO) {
        return await this.authService.validateUserByPassword(loginUser);
    }

    @Post('/register')
    public async register(@Res() response, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.authService.createUser(createUserDTO);
        return response.status(HttpStatus.OK).json(user);
    }

    @Post('/logout')
    @UseGuards(AuthGuard())
    public async logout(@Res() response, @Body() user: User) {
        if(user.access_token){
            user.access_token = "";
            const updatedUser = await this.userService.editUser(user._id, user);
            return response.status(HttpStatus.OK).json({});
        }
        return new UnauthorizedException();
    }

}
