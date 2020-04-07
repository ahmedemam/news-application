import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({ user });
    }

    @Get(':userID')
    @UseGuards(AuthGuard())
    async getUserById(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.userService.getUserById(userID);
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND_EXCEPTION');
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/edit')
    @UseGuards(AuthGuard())
    async editPost(
      @Res() res,
      @Query('userID', new ValidateObjectId()) userID,
      @Body() user: User,
    ) {
      const updatedUser = await this.userService.editUser(userID, user);
      if (!user) {
          throw new NotFoundException('USER_NOT_FOUND_EXCEPTION');
      }
      return res.status(HttpStatus.OK).json({user});
    }

}
