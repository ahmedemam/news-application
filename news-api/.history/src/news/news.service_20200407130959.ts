import { Injectable, HttpService } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './constants';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.NEWS_API);
    constructor(private httpService: HttpService, private userService: UserService){
    }


    public getAllNewsResources(){
        let sources = null;
        this.newsapi.v2.sources().then(s => {
            return s;
        }).catch(error => {
            console.log(error);
            throw error;
        });
    }
    
}



// TODO API WRAPPER
// TODO ACCESS TOKEN WITH REFRESH TOKEN