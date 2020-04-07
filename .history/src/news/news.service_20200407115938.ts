import { Injectable, HttpService } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as NewsAPI from 'newsapi';

@Injectable()
export class NewsService {
    newsapi = new NewsAPI('8fcef351de914f59b2797dadf86d4908');
    constructor(private httpService: HttpService, private userService: UserService){
    }
}
