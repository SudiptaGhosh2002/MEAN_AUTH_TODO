import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // <-- Import RouterLink here
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  // Ensure RouterLink is in the imports array
  imports: [ReactiveFormsModule, CommonModule, RouterLink], 
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      // The mobile validation seems overly strict, consider allowing more flexibility if needed
      mobile: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    });
  }
  
  onSubmit() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        console.log(data);
        alert(data.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
        if (err.error.message === 'User already exists') {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}