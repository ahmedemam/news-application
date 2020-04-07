import { Controller, Post, Res, Body, HttpStatus, Get } from '@nestjs/common';
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

    // Fetch a particular customer using ID
    @Get('customer/:customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json(customer);
    }
}
