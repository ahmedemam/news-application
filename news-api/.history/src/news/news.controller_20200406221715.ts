import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @Get('/top')
    async findAllHeadings(): Promise<any> {
        this.newsService.getAllResources();
        return HttpStatus.OK;
    }
}
