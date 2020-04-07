import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService, private usersService: UserService){}

    @Get('/sources')
    @UseGuards(AuthGuard())
    async getAllNewsResources(@Res() respone) {
        const sources = await this.newsService.getAllNewsResources();
        return respone.status(HttpStatus.OK).json(sources);
    }
}
