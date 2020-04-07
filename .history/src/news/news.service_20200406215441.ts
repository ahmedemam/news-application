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
            return response;
        });
    }

    public async getEveryting() {
        this.newsapi.v2.everything({
            q: 'bitcoin',
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2017-12-01',
            to: '2017-12-12',
            language: 'en',
            sortBy: 'relevancy',
            page: 2
          }).then(response => {
            console.log(response);
            return response;
          });
    }

    public async getSorces(){
        this.newsapi.v2.sources({
            category: 'technology',
            language: 'en',
            country: 'us'
          }).then(response => {
            console.log(response);
            return response;
          });
    }

}
