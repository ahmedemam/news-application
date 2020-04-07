import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({ user });
    }

    @Get(':userID')
    async getPost(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const post = await this.userService.getUserById(userID);
        if (!post) {
            throw new NotFoundException('USER_NOT_FOUND_EXCEPTION');
        }
        return res.status(HttpStatus.OK).json(post);
    }

    // Fetch all posts
    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

}
