import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private route: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401) {
                            localStorage.removeItem('token');
                            this.route.navigateByUrl('/user/login');
                        }
                    }
                )
            )
        }
        else {
            return next.handle(req.clone());
            //comment to commit
        }
    }
}