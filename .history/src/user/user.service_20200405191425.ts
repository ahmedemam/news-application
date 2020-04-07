import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(userID): Promise<User> {
        const user = await this.userModel
            .findById(userID)
            .exec();
        return post;
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = await this.userModel(createUserDTO);
        return newUser.save();
    }

    async editUser(postID, createUserDTO: CreateUserDTO): Promise<User> {
        const editedUser = await this.userModel
            .findByIdAndUpdate(postID, createUserDTO, { new: true });
        return editedUser;
    }

    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel
            .findByIdAndRemove(userID);
        return deletedUser;
    }
}
