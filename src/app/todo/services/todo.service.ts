import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = `${environment.apiUrl}todos`;
  private http = inject(HttpClient);

  todos = signal<Todo[]>([]);

  getItems() {
    this.http.get<Todo[]>(this.url).subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  addItem(value: string) {
    this.http.post<Todo>(this.url, { value }).subscribe((addedTodo) => {
      this.todos.update((items) => [...items, addedTodo]);
    });
  }

  updateItem(value: Todo) {
    const index = this.todos().findIndex((item) => item.id === value.id);

    this.http
      .put<Todo>(`${this.url}/${value.id}`, value)
      .subscribe((updatedTodo) => {
        this.todos.update((items) => {
          items[index] = updatedTodo;

          return items;
        });
      });
  }

  removeitem(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe(() => {
      this.todos.update((items) => items.filter((item) => item.id !== id));
    });
  }
}
