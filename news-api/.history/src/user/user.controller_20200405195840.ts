import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Put, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        });
    }

    @Get('users')
    async getAllUsers(@Res() res) {
        const users = await this.userService.getAllUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('user/:userId')
    async getCustomer(@Res() res, @Param('userId') userId) {
        const user = await this.userService.getUser(userId);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
    @Put('/update')
    async updateCustomer(@Res() res, @Query('userId') userId, @Body() createUserDTO: CreateUserDTO) {
        const customer = await this.userService.editUser(userId, createUserDTO);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been successfully updated',
            customer
        });
    }

    @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('userId') userId) {
        const customer = await this.userService.deleteUser(userId);
        if (!customer) throw new NotFoundException('Customer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer
        })
    }
}
