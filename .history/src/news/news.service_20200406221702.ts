import { Injectable, HttpService } from '@nestjs/common';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './news-api-config';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.API_KEY);
    constructor(private httpService: HttpService) {
    }

    public getAllResources(){
       return this.httpService.get(`${NEWS_API_CONFIG}/sources?apiKey=${NEWS_API_CONFIG.API_KEY}`).subscribe(resource => {
           console.log('resource', resource)
       });
    }




}
