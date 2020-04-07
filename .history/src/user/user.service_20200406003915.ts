import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUser(userId): Promise<User> {
        return await this.userModel
            .findById(userId)
            .exec();

    }

    async getUserByEmail(email): Promise<User> {
        return await this.userModel.findOne(email).exec();
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        return await new this.userModel(createUserDTO).save();
    }

    async editUser(userId, createUserDTO: CreateUserDTO): Promise<User> {
        return await this.userModel
            .findByIdAndUpdate(userId, createUserDTO, { new: true });
    }

    async deleteUser(userId): Promise<any> {
        return await this.userModel
            .findByIdAndRemove(userId);
    }

}
