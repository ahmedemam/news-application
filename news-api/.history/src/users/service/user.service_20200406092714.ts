import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDTO } from '../dto/create-user.to';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    public async getOneUser(userID): Promise<User> {
        return await this.userModel.findById(userID).exec();
    }
    public async addUser(createUserDTO: CreateCustomerDTO): Promise<User> {
        return await new this.userModel(createUserDTO).save();

    }
    public async updateUser(userID, createUserDTO: CreateCustomerDTO): Promise<User> {
        return await this.userModel.findByIdAndUpdate(userID, createUserDTO, { new: true });
    }

}
