import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService, private usersService: UserService){}

    @Get('/sources')
    // @UseGuards(AuthGuard())
    public async getAllNewsResources(@Res() respone) {
        const sources = await this.newsService.getAllNewsResources();
        return respone.status(HttpStatus.OK).json(sources);
    }

    @Get('/articles/:userID')
    // @UseGuards(AuthGuard())
    public async getAllArticlesByUserConfiguration(@Res() respone, ) {
        const sources = await this.newsService.getAllNewsResources();
        return respone.status(HttpStatus.OK).json(sources);
    }

    @Get('')
    @UseGuards(AuthGuard())
    async getUserById(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.userService.getUserById(userID);
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND_EXCEPTION');
        }
        return res.status(HttpStatus.OK).json(user);
    }
}
