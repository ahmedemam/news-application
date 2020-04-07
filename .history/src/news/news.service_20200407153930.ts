import { Injectable, HttpService } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './constants';
import { User } from 'src/user/user.interface';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.NEWS_API);
    constructor(private httpService: HttpService, private userService: UserService) {
    }

    public async getAllNewsResources() {
        const resource = await this.newsapi.v2.sources();
        return await resource;
    }

    public async getNewsByUserConfiguration(userID: string) {
        // const user = await this.userService.getUserById(userID);
        // if (user) {
            const articles = await this.newsapi.v2.topHeadlines({
                sources: 'bbc-news,the-verge',
                q: 'bitcoin',
                category: 'business',
                language: 'en',
                country: 'us'
            });
            return await articles;
        // }
        return false;
    }



}



// TODO API WRAPPER
// TODO ACCESS TOKEN WITH REFRESH TOKEN


// SOURCES ONLY topHeadlines