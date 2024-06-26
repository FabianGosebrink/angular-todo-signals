import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
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
export class TodoMainComponent implements OnInit {
  private todoService = inject(TodoService);

  count = this.todoService.count;
  doneItems = this.todoService.doneItems;
  openItems = this.todoService.openItems;
  sortedTodos = this.todoService.sortedTodos;

  constructor() {
    effect(() => {
      // console.log('Todos changed:', this.sortedTodos())
      console.log('Todos changed (effect):', this.count());
    });
  }

  ngOnInit(): void {
    this.todoService.getItems();
  }

  addTodo(value: string) {
    this.todoService.replaceItem();
    // this.todoService.addItem(value);
  }

  deleteTodo(item: Todo): void {
    this.todoService.removeItem(item.id);
  }

  markAsDone(item: Todo): void {
    this.todoService.updateItem(item);
  }
}
