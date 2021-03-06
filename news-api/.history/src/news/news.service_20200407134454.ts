import { Injectable, HttpService } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './constants';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.NEWS_API);
    constructor(private httpService: HttpService, private userService: UserService){
    }


    public async getAllNewsResources(){
       const resource = await this.newsapi.v2.sources();
       return resource;
    }
    
}



// TODO API WRAPPER
// TODO ACCESS TOKEN WITH REFRESH TOKEN