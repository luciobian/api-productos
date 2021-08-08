import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  response: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  logger: Logger;
  constructor() {
    if (!this.logger) {
      this.logger = new Logger();
    }
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    const { originalUrl, headers, body } = req;

    Logger.log(`EP: ${originalUrl} | BODY: ${JSON.stringify(body)} | HEADERS: ${JSON.stringify(headers)}`);

    return next.handle().pipe(
      map((response) => {
        Logger.log(`ControllerResponse: ${JSON.stringify(response)}`);
        return response;
      })
    );
  }
}
