import { Injectable, HttpService } from '@nestjs/common';
import * as NewsAPI from 'newsapi';
import { NEWS_API_CONFIG } from './news-api-config';
import { Sources } from './sources.interface';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI(NEWS_API_CONFIG.API_KEY);
    constructor(private httpService: HttpService) {
    }

    public async getAllResources(){
        return this.httpService.get(`${NEWS_API_CONFIG.NEWS_API_URL}/sources?apiKey=${NEWS_API_CONFIG.API_KEY}`);
    }

    public async getAllArticlesUserConfiguration(sources: any){
        return this.httpService.get(`${NEWS_API_CONFIG.NEWS_API_URL}/top-headlines&apiKey=${NEWS_API_CONFIG.API_KEY}`).subscribe(e => {
            console.log(e.data)
            return e;
        }, (er)=> {
            console.log(er);
            return er;
        });
    }



}
