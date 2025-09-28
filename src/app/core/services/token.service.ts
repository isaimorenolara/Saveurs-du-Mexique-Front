import { Injectable } from '@angular/core';
import { UserRole } from '../../shared/models/auth/role.model';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private getPayload(): any | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = new TextDecoder().decode(
        Uint8Array.from(atob(payloadBase64), c => c.charCodeAt(0))
      );
      return JSON.parse(payloadJson);
    } catch {
      return null;
    }
  }

  getUserRole(): UserRole | null {
    const payload = this.getPayload();
    const role = payload?.rol;
    if (role === UserRole.Admin || role === UserRole.Customer || role === UserRole.Seller) {
      return role as UserRole;
    }
    return null;
  }

  getUserName(): string | null {
    return this.getPayload()?.nombre || null;
  }

  getUserId(): string | null {
    return this.getPayload()?.id || null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === UserRole.Admin;
  }

  isCustomer(): boolean {
    return this.getUserRole() === UserRole.Customer;
  }

  isSeller(): boolean {
    return this.getUserRole() === UserRole.Seller;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}