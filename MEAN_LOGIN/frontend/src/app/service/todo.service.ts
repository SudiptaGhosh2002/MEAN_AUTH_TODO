import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todos'; // Assumes proxy is set up

  constructor(private http: HttpClient) { }

  // NOTE: You'll need to get the token from your auth service
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or wherever you store it
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addTodo(task: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { task }, { headers: this.getAuthHeaders() });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo._id}`;
    return this.http.put<Todo>(url, { completed: todo.completed, task: todo.task }, { headers: this.getAuthHeaders() });
  }

  deleteTodo(id: string): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }
}
