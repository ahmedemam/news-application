import { Injectable, HttpService } from '@nestjs/common';
import * as NewsAPI from 'newsapi';
import { UserService } from 'src/user/user.service';
import { NEWS_API_CONFIG } from './news-api-config';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.API_KEY);
    constructor(private httpService: HttpService, private userService: UserService) {
    }


    public async getTopHeadings() {
        this.newsapi.v2.topHeadlines({
            sources: 'bbc-news,the-verge',
            q: 'bitcoin',
            category: 'business',
            language: 'en',
            country: 'us'
        }).then(response => {
            console.log(response);
            return await response;
        });
    }

    public async getEveryting() {
    }

}
