import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){

    }
}
