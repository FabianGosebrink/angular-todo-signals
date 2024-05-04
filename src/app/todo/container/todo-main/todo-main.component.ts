import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoFormComponent } from '../../presentational/todo-form/todo-form.component';
import { TodoListComponent } from '../../presentational/todo-list/todo-list.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoListComponent],
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent {
  private todoService = inject(TodoService);

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

  todos = this.todoService.todos;

  title = 'todo-signals';

  ngOnInit(): void {
    this.todoService.getItems();
  }

  addTodo(value: string) {
    this.todoService.addItem(value);
  }

  deleteTodo(item: Todo): void {
    this.todoService.removeitem(item.id);
  }

  markAsDone(item: Todo): void {
    this.todoService.updateItem(item);
  }
}
