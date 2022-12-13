import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class IsAdminAuthorization implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpRequest = context.switchToHttp().getRequest();

    const userData = httpRequest.user;

    if (userData.isAdmin === true) {
      return true;
    }

    throw new UnauthorizedException(
      'user do not have permission to access this path',
    );
  }
}
