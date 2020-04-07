import { Controller, Get, Res } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService){}

    @Get('/top')
    async getTopHeadings(@Res response) {
        const user = await this.userService.getUserById(userID);
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND_EXCEPTION');
        }
        return res.status(HttpStatus.OK).json(user);
    }    
}
