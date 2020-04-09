import { Injectable, HttpService, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './constants';
import { User } from 'src/user/user.interface';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.NEWS_API);
    constructor(private httpService: HttpService, private userService: UserService) {
    }

    public async getAllNewsResources(userID: string) {
        const user = await this.userService.getUserById(userID);
        if (user) {
        const resource = await this.newsapi.v2.sources();
        return await resource;
        }
        return new UnauthorizedException();
    }

    public async getNewsByUserConfiguration(userID: string) {
        const user = await this.userService.getUserById(userID);
        if (user && user.sources.length > 0) {
            const sources = user.sources.join(',');
            const articles = await this.newsapi.v2.topHeadlines({sources});
            return await articles;
        }else{
            const articles = await this.newsapi.v2.topHeadlines();
            return await articles;
        }
        return false;
    }
}

