import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users/service/user.service';

@Controller()
export class AppController {
  constructor( private userService: UserService, private readonly appService: AppService) {
  }
}
