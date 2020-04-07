import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, authInfo, errInfo) {
    if (authInfo && !error && !errInfo) {
      return authInfo;
    } else {
      return new UnauthorizedException();
    }
  }
}