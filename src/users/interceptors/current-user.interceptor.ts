// import {
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   Injectable,
// } from '@nestjs/common';
// import { UsersService } from '../users.service';

// @Injectable()
// export class CurrentUserInterceptor implements NestInterceptor {
//   constructor(private usersSer: UsersService) {}

//   async intercept(context: ExecutionContext, handler: CallHandler) {
//     const request = context.switchToHttp().getRequest();
//     const { userId } = request.session || {};

//     if (userId) {
//       const user = await this.usersSer.findOne(userId);
//       request.currentUser = user;
//       // console.log(request.currentUser);
//     }

//     return handler.handle();
//   }
// }
