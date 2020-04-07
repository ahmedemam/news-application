import { Controller, Post, Body, UseGuards, Response, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/user/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private userService: UserService) { }

    @Post('register')
    public async register(@Response() res, @Body() createUserDto: CreateUserDTO) {
        const result = await this.authService.register(createUserDto);
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(@Response() res, @Body() user: User) {
        return await this.userService.getUser({ username: user.email }).then(user => {
            if (!user) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'User Not Found',
                });
            } else {
                const token = this.authService.createToken(user);
                return res.status(HttpStatus.OK).json(token);
            }
        });
    }
}
