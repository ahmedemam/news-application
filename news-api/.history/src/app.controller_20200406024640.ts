import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/service/user.service';
import { CreateUserDTO } from './user/dto/create-user.dto';
import { User } from './user/interface/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UserService) {
    this.addUser();
  }

  addUser(){
    const user: User = {
      username: "ahmedabdelazizemam",
      password: "000000",
      email: "test@test.com"
    };
    this.userService.addUser(user).then(user => {
      console.log(user);
    });
  }
}
