import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login · Saveurs du Mexique' },
    { path: 'register', component: RegisterComponent, title: 'Sign up · Saveurs du Mexique' },
    { path: '**', redirectTo: 'login' },
];