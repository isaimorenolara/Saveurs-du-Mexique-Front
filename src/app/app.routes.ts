import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.page/home.page.component';
import { AboutPageComponent } from './pages/about/about.page/about.page.component';
import { ContactPageComponent } from './pages/contact/contact.page/contact.page.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    { path: 'about', component: AboutPageComponent},
    { path: 'contact', component: ContactPageComponent },
    {
        path: 'auth',
        canMatch: [guestGuard],
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
    },
    {
        path: 'account',
        canMatch: [authGuard],
        loadChildren: () => import('./features/account/account.routes').then(m => m.ACCOUNT_ROUTES),
    },
    { path: '**', redirectTo: '' },
];