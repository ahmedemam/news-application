import { Injectable, HttpService } from '@nestjs/common';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './news-api-config';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.API_KEY);
    constructor(private httpService: HttpService) {
    }

    getAllResources(){
        this.httpService.get(`${NEWS_API_CONFIG}/sources?apiKey=${NEWS_API_CONFIG.API_KEY}`).subscribe(sources => {
            console.log(sources);
            return sources;
        })
    }

}
