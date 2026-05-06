import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
 selector: 'app-register',
 standalone: true,
 imports: [FormsModule, RouterModule],
 templateUrl: './register.html',
 styleUrl: './register.css'
})
export class Register {

 user = {
   name: '',
   email: '',
   password: ''
 };

 constructor(private auth: AuthService, private router: Router) {}

 registerUser() {
   this.auth.register(this.user);
   alert('Registered Successfully');
   this.router.navigate(['/login']);
 }
}
