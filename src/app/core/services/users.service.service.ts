// src/app/core/services/users.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsersPage } from '../../shared/models/auth/';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.backendUrl}/users/list`;

  list(params: { page?: number; pageSize?: number; sortBy?: 'createdAt'|'name'; order?: 'asc'|'desc' } = {}): Observable<UsersPage> {
    let p = new HttpParams();
    if (params.page) p = p.set('page', params.page);
    if (params.pageSize) p = p.set('pageSize', params.pageSize);
    if (params.sortBy) p = p.set('sortBy', params.sortBy);
    if (params.order) p = p.set('order', params.order);
    return this.http.get<UsersPage>(this.apiUrl, { params: p });
  }
}