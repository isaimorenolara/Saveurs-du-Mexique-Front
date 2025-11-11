import { Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UsersListComponent, title: 'Users · Saveurs du Mexique' },
    { path: '**', redirectTo: 'users' },
]