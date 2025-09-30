import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders/orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail/order-detail.component';

export const ACCOUNT_ROUTES: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, title: 'My Profile · Saveurs du Mexique' },
    { path: 'orders', component: OrdersComponent, title: 'My Orders · Saveurs du Mexique' },
    { path: 'orders/:id', component: OrderDetailComponent, title: 'Order Detail · Saveurs du Mexique' },
    { path: '**', redirectTo: 'profile' },
];