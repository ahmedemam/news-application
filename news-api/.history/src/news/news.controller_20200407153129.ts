import { Controller, Get, UseGuards, Req, Res, HttpStatus, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService, private usersService: UserService){}

    @Get('/sources')
    // @UseGuards(AuthGuard())
    public async getAllNewsResources(@Res() response) {
        const sources = await this.newsService.getAllNewsResources();
        return response.status(HttpStatus.OK).json(sources);
    }

    @Get('/articles:userID')
    // @UseGuards(AuthGuard())
    public async getAllArticlesByUserConfiguration(@Res() response , @Param('userID',  new ValidateObjectId()) userID) {
        const articles = await this.newsService.getNewsByUserConfiguration(userID);
        console.log(articles);
        return response.status(HttpStatus.OK).json(articles);
    }

}
