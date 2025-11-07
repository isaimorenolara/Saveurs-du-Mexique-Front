import { Injectable } from '@angular/core';
import { UserRole } from '../../shared/models/auth/role.model';

type JwtPayload = {
  sub: string;
  role: UserRole;
  email?: string;
  nombre?: string;
  exp?: number;
  iat?: number;
};

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly LS_KEY = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.LS_KEY) || sessionStorage.getItem(this.LS_KEY);
  }

  setToken(token: string, remember = false): void {
    this.clearToken();
    (remember ? localStorage : sessionStorage).setItem(this.LS_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.LS_KEY);
    sessionStorage.removeItem(this.LS_KEY);
  }

  private getPayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64 = token.split('.')[1];
      const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(json) as JwtPayload;
      return payload ?? null;
    } catch {
      return null;
    }
  }

  private isExpired(payload: JwtPayload | null): boolean {
    if (!payload?.exp) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return nowSec >= payload.exp;
  }

  isLoggedIn(): boolean {
    const p = this.getPayload();
    return !!p && !this.isExpired(p);
  }

  getUserId(): string | null {
    return this.getPayload()?.sub ?? null;
  }

  getUserRole(): UserRole | null {
    const role = this.getPayload()?.role;
    if (role === UserRole.Admin || role === UserRole.Customer || role === UserRole.Seller) {
      return role;
    }
    return null;
  }

  getUserName(): string | null {
    return this.getPayload()?.nombre ?? null;
  }

  logout(): void {
    this.clearToken();
  }
}