import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTask: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTask.trim()) {
      this.todoService.addTodo(this.newTask).subscribe(newTodo => {
        this.todos.push(newTodo);
        this.newTask = ''; // Clear the input
      });
    }
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(todoToDelete: Todo): void {
    this.todoService.deleteTodo(todoToDelete._id).subscribe(() => {
      // On success, filter the todo out of the local array
      this.todos = this.todos.filter(todo => todo._id !== todoToDelete._id);
    });
  }
}
