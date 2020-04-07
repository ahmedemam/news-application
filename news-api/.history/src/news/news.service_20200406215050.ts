import { Injectable, HttpService } from '@nestjs/common';
import * as NewsAPI from 'newsapi';
import { UserService } from 'src/user/user.service';
import { NEWS_API_CONFIG } from './news-api-config';

@Injectable()
export class NewsService {
    newsapi: any = null;
    constructor(private httpService: HttpService, private userService: UserService) {
        this.newsapi = new NewsAPI(NEWS_API_CONFIG.API_KEY);
    }


    getTopHeadings(){
        this.newsapi.v2.topHeadlines({
            sources: 'bbc-news,the-verge',
            q: 'bitcoin',
            category: 'business',
            language: 'en',
            country: 'us'
          }).then(response => {
            console.log(response);
            /*
              {
                status: "ok",
                articles: [...]
              }
            */
          });
    }
}
