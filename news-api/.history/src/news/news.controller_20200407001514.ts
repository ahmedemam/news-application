import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { Sources } from './sources.interface';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }
    

    @Get('/top')
    public async getArticle(){
        const sources: Sources = null;
        this.newsService.getAllArticlesUserConfiguration(sources);
    }
}
