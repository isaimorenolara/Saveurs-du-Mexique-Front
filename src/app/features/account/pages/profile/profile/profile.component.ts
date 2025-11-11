import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, map, startWith, switchMap, of, Subject, Observable } from 'rxjs';
import { AuthApiService } from '../../../../../core/services/auth-api.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  vm$ : Observable<any>;

  constructor(private api: AuthApiService) {
    this.vm$ = this.api.me().pipe(
      map(user => ({ loading: false, error: null as string|null, user })),
      startWith({ loading: true, error: null, user: null }),
      catchError(() => of({ loading: false, error: 'Failed to load profile', user: null }))
    );
  }
}
