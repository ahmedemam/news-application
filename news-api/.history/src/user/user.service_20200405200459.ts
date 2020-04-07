import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(userId): Promise<User> {
        const user = await this.userModel
            .findById(userId)
            .exec();
        return user;
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = await new this.userModel(createUserDTO);
        return newUser.save();
    }

    async editUser(userId, createUserDTO: CreateUserDTO): Promise<User> {
        const editedUser = await this.userModel
            .findByIdAndUpdate(userId, createUserDTO, { new: true });
        return editedUser;
    }

    async deleteUser(userId): Promise<any> {
        const deletedUser = await this.userModel
            .findByIdAndRemove(userId);
        return deletedUser;
    }
}
