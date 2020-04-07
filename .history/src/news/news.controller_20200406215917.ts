import { Controller, Get, Res } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService){}

    @Get('/top')
    async getTopHeadings() {
        return this.newsService.getTopHeadings();
    }    
}
