import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUsertDTO } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    public async createUser(createUserDTO: CreateUsertDTO): Promise<User> {
        return new this.userModel(createUserDTO).save();;
    }

    public async getUserById(userID: string): Promise<User> {
        return this.userModel.findById(userID).exec();
    }

    public async getUserByEmail(userEmail: string): Promise<User> {
        return this.userModel.findOne({email: userEmail}).exec();
    }
}
