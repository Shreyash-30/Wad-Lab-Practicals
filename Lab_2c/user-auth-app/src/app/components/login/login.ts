import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';

@Component({
 selector: 'app-login',
 standalone: true,
 imports: [FormsModule, RouterModule],
 templateUrl: './login.html',
 styleUrl: './login.css'
})
export class Login {

 email = '';
 password = '';

 constructor(private auth: AuthService, private router: Router) {}

 loginUser() {
   const success = this.auth.login(this.email, this.password);

   if (success) {
     alert('Login Successful');
     this.router.navigate(['/profile']);
   } else {
     alert('Invalid Credentials');
   }
 }
}
