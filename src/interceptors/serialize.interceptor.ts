import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassContructor{
    new (...args:any[]):{}
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Run logic here before a request is handler by the request handler
    // console.log(context);
    return handler.handle().pipe(
      map((data: any) =>
        //run logic  here before a response is send out
        //here the "data" is the data will be sent to client, it is a JSON object
        plainToClass(this.dto, data, { excludeExtraneousValues: true }),
      ),
    );
  }
}

export function Serialize(dto:ClassContructor) {
  return UseInterceptors( new SerializeInterceptor(dto));
}
