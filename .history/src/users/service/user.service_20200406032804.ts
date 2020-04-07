import { Injectable } from '@nestjs/common';
import { User } from '../interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(){

    }
}
