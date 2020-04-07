import { Injectable, HttpService } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as NewsAPI from 'newsapi';

@Injectable()
export class NewsService {
    constructor(private httpService: HttpService, private userService: UserService){
    }
}
