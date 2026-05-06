import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
 { path: '', component: Login },
 { path: 'login', component: Login },
 { path: 'register', component: Register },
 { path: 'profile', component: Profile }
];
