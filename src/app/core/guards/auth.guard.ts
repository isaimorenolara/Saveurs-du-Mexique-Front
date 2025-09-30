import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

export const authGuard: CanMatchFn = (_route, segments: UrlSegment[]) => {
    const token = inject(TokenService);
    const router = inject(Router);

    if (token.isLoggedIn()) return true;

    const next = '/' + segments.map(s => s.path).join('/');
    router.navigate(['/auth/login'], { queryParams: { next } });
    return false;
};