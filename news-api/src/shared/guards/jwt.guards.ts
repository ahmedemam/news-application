import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, auth, errorInfo) {
    if (auth && !error && !errorInfo) {
      return auth;
    } else {
      return new UnauthorizedException();
    }
  }
}