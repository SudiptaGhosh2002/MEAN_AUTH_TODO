import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Keep HttpErrorResponse for error typing

// Import the AuthService
import { AuthService } from '../../service/auth-service'; 

@Component({
 selector: 'app-login',
 standalone: true,
 imports: [ReactiveFormsModule, RouterLink],
 templateUrl: './login.html',
 styleUrl: './login.scss'
})
export class Login {
 loginForm: FormGroup;

 // Inject AuthService instead of HttpClient
 constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
     this.loginForm = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required]]
 });
 }

 onSubmit() {
     if (this.loginForm.valid) {
     // Use authService.login() here
     this.authService.login(this.loginForm.value).subscribe({ 
     next: (res: any) => {
     console.log(res);
     localStorage.setItem('token', res.token);
     alert('Login Successful');
     this.router.navigate(['/dashboard']);
 },
 // Error handling remains the same
 error: (err: HttpErrorResponse) => { 
 console.log(err);
 // Check if err.error exists before accessing message
 alert(err.error?.message || 'Login failed due to an unknown error.');
  }
  });
  }
  }
}