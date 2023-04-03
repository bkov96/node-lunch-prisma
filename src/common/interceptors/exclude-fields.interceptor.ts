import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { exclude } from '../typescript/utils';

type StringKeys<T> = Extract<keyof T, string>;

@Injectable()
export class ExcludeFieldInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly keys: StringKeys<T>[]) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response instanceof Array) {
          return response.map((item) => exclude(item, this.keys));
        } else {
          return exclude(response, this.keys);
        }
      }),
    );
  }
}

export const ExcludeResponseFields = <T>(...keys: StringKeys<T>[]) =>
  new ExcludeFieldInterceptor<T>(keys);
