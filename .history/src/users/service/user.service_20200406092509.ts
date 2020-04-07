import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDTO } from '../dto/create-user.to';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    
    async getOneUser(userID): Promise<User> {
        return await this.userModel.findById(userID).exec();
    }
    async addUser(createUserDTO: CreateCustomerDTO): Promise<User> {
        const newUser = await this.userModel(createUserDTO);
        return newUser.save();
    }
    async updateCustomer(customerID, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const updatedCustomer = await this.customerModel
            .findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
        return updatedCustomer;
    }
    
}
