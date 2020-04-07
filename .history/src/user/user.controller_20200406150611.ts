import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';

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
    async getUserById(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.userService.getUserById(userID);
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND_EXCEPTION');
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/edit')
    async editPost(
      @Res() res,
      @Query('userID', new ValidateObjectId()) userID,
      @Body() createPostDTO: CreateUserDTO,
    ) {
      const user = await this.userService.editUser(userID, createPostDTO);
      if (!user) {
          throw new NotFoundException('USER_NOT_FOUND_EXCEPTION');
      }
      return res.status(HttpStatus.OK).json({user});
    }

}
