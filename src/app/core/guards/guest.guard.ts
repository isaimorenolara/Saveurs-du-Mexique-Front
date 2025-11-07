import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

export const guestGuard: CanMatchFn = () => {
    const token = inject(TokenService);
    const router = inject(Router);

    if (!token.isLoggedIn()) return true;

    router.navigate(['/']);
    return false;
};