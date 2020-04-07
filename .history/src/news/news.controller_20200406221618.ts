import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }
}
