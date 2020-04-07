import { Controller, Post, Res, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post('/register')
    async addCustomer(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const customer = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "Customer has been created successfully",
            customer
        })
    }

    // Retrieve customers list
    @Get('customers')
    async getAllCustomer(@Res() res) {
        const customers = await this.customerService.getAllCustomer();
        return res.status(HttpStatus.OK).json(customers);
    }

    // Fetch a particular customer using ID
    @Get('customer/:customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json(customer);
    }
}
