import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { EMPTY, Observable, TimeoutError, catchError, timeout } from 'rxjs';


export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const responseType = req.headers.get('responseType')
    if(responseType=='blob'){
      timeoutValue=90000
    }
    const timeoutValueNumeric = Number(timeoutValue);

    const token = localStorage.getItem('jwtToken');
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `bearer ${token}` },
      });
    }
    return next.handle(req).pipe(
      timeout(timeoutValueNumeric),
    );
  }
}
