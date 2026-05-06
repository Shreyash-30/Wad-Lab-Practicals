import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class AuthService {

 register(user: any) {
   localStorage.setItem('user', JSON.stringify(user));
 }

 login(email: string, password: string): boolean {
   const user = JSON.parse(localStorage.getItem('user') || '{}');

   if (user.email === email && user.password === password) {
     localStorage.setItem('loggedIn', 'true');
     return true;
   }
   return false;
 }

 getUser() {
   return JSON.parse(localStorage.getItem('user') || '{}');
 }	

 isLoggedIn() {
   return localStorage.getItem('loggedIn') === 'true';
 }

 logout() {
   localStorage.removeItem('loggedIn');
 }
}
