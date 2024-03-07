import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { FilterTodoType } from '../../filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];

  public filtroActual: FilterTodoType = FilterTodoType.ALL;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('todo').subscribe((todos) => {
    //   this.todos = todos;
    // });
    this.store.subscribe(({ todo, filtro }) => {
      this.todos = todo;
      this.filtroActual = filtro;
    });
  }
}
