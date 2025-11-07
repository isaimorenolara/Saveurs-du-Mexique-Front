import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const isApiCall = req.url.startsWith(environment.backendUrl);

    let authReq: HttpRequest<any> = req;
    if (token && isApiCall) {
        authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ...(req.body ? { 'Content-Type': 'application/json' } : {}),
        },
        });
    }

    return next(authReq).pipe(
        catchError((err) => {
        if (isApiCall && (err.status === 401 || err.status === 403)) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            router.navigate(['/auth/login']);
        }
        return throwError(() => err);
        })
    );
};