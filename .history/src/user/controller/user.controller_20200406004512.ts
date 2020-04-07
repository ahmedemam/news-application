import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Put, Query, Delete } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';

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

    @Get('/user/:userId')
    async getCustomer(@Res() res, @Param('userId', new ValidateObjectId()) userId) {
        const user = await this.userService.getUser(userId);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
    @Put('/update')
    async updateCustomer(@Res() res, @Query('userId', new ValidateObjectId()) userId, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.editUser(userId, createUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user
        });
    }

    @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('userId', new ValidateObjectId()) userId) {
        const user = await this.userService.deleteUser(userId);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        })
    }
}
