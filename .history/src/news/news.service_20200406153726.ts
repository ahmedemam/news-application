import { Injectable, HttpService } from '@nestjs/common';
import * as NewsAPI from 'newsapi';

@Injectable()
export class NewsService {
    constructor(private httpService: HttpService){

    }
}
