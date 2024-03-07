import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent {
  public completado: boolean = false;

  constructor(private store: Store<AppState>) {}

  toggleAll() {
    this.completado = !this.completado;
    this.store.dispatch(actions.toggleAll({ estado: this.completado }));
  }
}
