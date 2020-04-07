import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/service/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UserService) {
  }
}
