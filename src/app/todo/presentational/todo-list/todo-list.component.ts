import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  items = input<Todo[]>([]);
  doneItems = input<Todo[]>([]);

  markAsDone = output<Todo>();
  delete = output<Todo>()

  moveToDone(item: Todo) {
    item.done = !item.done;
    this.markAsDone.emit(item);
  }

  deleteItem(item: Todo) {
    if (confirm('Really delete?')) {
      this.delete.emit(item);
    }
  }
}
