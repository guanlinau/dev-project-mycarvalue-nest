import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(request.currentUser);
    if (!request.currentUser) return false;

    return request.currentUser.admin;
  }
}
