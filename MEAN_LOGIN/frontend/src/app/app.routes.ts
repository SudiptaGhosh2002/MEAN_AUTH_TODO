import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }
];
