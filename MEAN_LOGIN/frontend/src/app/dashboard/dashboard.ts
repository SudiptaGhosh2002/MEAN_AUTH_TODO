import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
