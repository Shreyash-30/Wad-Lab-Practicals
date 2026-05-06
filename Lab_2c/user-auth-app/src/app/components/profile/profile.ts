import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
 selector: 'app-profile',
 standalone: true,
 templateUrl: './profile.html',
 styleUrl: './profile.css'
})
export class Profile implements OnInit {

 user: any = {};

 constructor(private auth: AuthService, private router: Router) {}

 ngOnInit() {
   if (!this.auth.isLoggedIn()) {
     this.router.navigate(['/login']);
   }
   this.user = this.auth.getUser();
 }

 logout() {
   this.auth.logout();
   this.router.navigate(['/login']);
 }
}
