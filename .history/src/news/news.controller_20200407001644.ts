import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { Sources } from './sources.interface';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }
    

    @Get('/top')
    public async getArticle(){
        let sources: Sources = {
            category: '',
            country: '',
            language:''
        };
        this.newsService.getAllArticlesUserConfiguration(sources);
    }
}
