import { Injectable, HttpService } from '@nestjs/common';
import * as NewsAPI from 'newsapi';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NewsService {
    constructor(private httpService: HttpService, private userService: UserService){
    }
}
