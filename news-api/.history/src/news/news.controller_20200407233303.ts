import { Controller, Get, UseGuards, Req, Res, HttpStatus, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService, private usersService: UserService) { }

    @Get('/sources/:userID')
    @UseGuards(AuthGuard())
    public async getAllNewsResources(@Res() response, @Param('userID', new ValidateObjectId()) userID) {
        const sources = await this.newsService.getAllNewsResources(userID);
        return response.status(HttpStatus.OK).json(sources);
    }

    @Get('/articles/:userID')
    @UseGuards(AuthGuard())
    public async getAllArticlesByUserConfiguration(@Res() response, @Param('userID', new ValidateObjectId()) userID) {
        const articles = await this.newsService.getNewsByUserConfiguration(userID);
        return response.status(HttpStatus.OK).json(articles);
    }

}


// TODO INTEGRATION 
// TODO VALIDATION 
// TODO TESTING 
// TODO DEPLOYMNENT 
// TODO ACCESS_TOKEN / REFRESH_TOKEN