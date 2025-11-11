import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { catchError, map, startWith, switchMap, of, Subject } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service.service';
import { UsersPage } from '../../../../shared/models/auth';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  constructor(
    private api: UsersService,
  ) {}

  page = signal(1);
  pageSize = signal(10);
  sortBy = signal<'createdAt'|'name'>('createdAt');
  order  = signal<'asc'|'desc'>('desc');

  private reload$ = new Subject<void>();

  vm$ = this.reload$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.api.list({
        page: this.page(),
        pageSize: this.pageSize(),
        sortBy: this.sortBy(),
        order: this.order(),
      }).pipe(
        map((res: UsersPage) => ({
          loading: false,
          error: null as string | null,
          users: res.users,
          pag: res.pagination
        })),
        startWith({ loading: true, error: null, users: [], pag: null }),
        catchError(() => of({ loading: false, error: 'Error al cargar', users: [], pag: null }))
      )
    )
  );

  roleClass(role?: string) {
    switch ((role || '').toLowerCase()) {
      case 'admin':    return 'badge--admin';
      case 'seller':   return 'badge--seller';
      case 'customer': return 'badge--customer';
      default:         return 'badge--default';
    }
  }

  ngOnInit() { this.reload(); }
  reload() { this.reload$.next(); }

  goTo(p: number) { this.page.set(p); this.reload(); }
  next(totalPages: number) { if (this.page() < totalPages) { this.page.set(this.page()+1); this.reload(); } }
  prev() { if (this.page() > 1) { this.page.set(this.page()-1); this.reload(); } }
}
