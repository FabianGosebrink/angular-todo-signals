import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = `${environment.apiUrl}todos`;
  private http = inject(HttpClient);

  private todos = signal<Todo[]>([]);

  count = computed(() => {
    const allItems = this.todos();

    return allItems.length;
  });

  doneItems = computed(() => {
    const allItems = this.todos();

    return allItems.filter((item) => item.done)?.length;
  });

  openItems = computed(() => {
    const allItems = this.todos();

    return allItems.filter((item) => !item.done)?.length;
  });

  sortedTodos = computed(() => {
    const allItems = this.todos();

    return allItems.sort((b, a) => +b.done - +a.done);
  });

  getItems() {
    this.http.get<Todo[]>(this.url).subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  addItem(value: string) {
    this.http.post<Todo>(this.url, { value }).subscribe((addedTodo) => {
      this.todos.update((items) => [addedTodo, ...items]);
    });
  }

  updateItem(value: Todo) {
    this.http
      .put<Todo>(`${this.url}/${value.id}`, value)
      .subscribe((updatedTodo) => {
        this.todos.update((items) => {
          if (updatedTodo.done) {
            const allOtherItems = items.filter((item) => item.id !== value.id);

            return [...allOtherItems, updatedTodo];
          }

          const index = this.todos().findIndex((item) => item.id === value.id);
          items[index] = updatedTodo;

          return [...items];
        });
      });
  }

  removeitem(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe(() => {
      this.todos.update((items) => [...items.filter((item) => item.id !== id)]);
    });
  }
}
