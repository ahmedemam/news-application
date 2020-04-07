import { Injectable, HttpService } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './constants';
import { User } from 'src/user/user.interface';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.NEWS_API);
    constructor(private httpService: HttpService, private userService: UserService){
    }

    public async getAllNewsResources(){
       const resource = await this.newsapi.v2.sources();
       return await resource;
    }

    public async getNewsByUserConfiguration(user: User){
        const articles =  await this.newsapi.v2.everything({
            q: '',
            sources: user.sources.join(','),
            language: user.languages.join(','),
            country: user.categories.join(','),
            category: user.categories.join(','),
        });

        return await articles;
    }
    

    
}



// TODO API WRAPPER
// TODO ACCESS TOKEN WITH REFRESH TOKEN