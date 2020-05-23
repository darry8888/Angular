import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';

@Injectable()
export class AngularInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }, error => {
                if (error instanceof HttpErrorResponse) {
                    console.log('err.error =', error.status, ';');
                    if (error.status === 401) {
                        window.localStorage.clear();
                    }
                    if (error.status === 403) {
                        alert('您沒有權限進行此操作，請通知管理者。');
                    }
                    if (error.status === 500) {
                        alert('發生非預期的錯誤，請稍後再試。');
                    }
                    return observableThrowError(error);
                }
            })
        );
    }
}
