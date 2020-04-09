import { CreateUserDTO } from './create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        return await new this.userModel(createUserDTO).save();
    }

    public async getUserById(userID: string): Promise<User> {
        return await this.userModel.findById(userID).exec();
    }

    public async getUserByEmail(userEmail: string): Promise<User> {
        return await this.userModel.findOne({ email: userEmail }).exec();
    }
    public async editUser(userID: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(userID, user);
    }
}
