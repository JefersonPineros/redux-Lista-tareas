import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { limpiar } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css',
})
export class TodoFooterComponent implements OnInit {
  public filtroActual: actions.FilterTodoType = actions.FilterTodoType.ALL;
  public filtros: actions.FilterTodoType[] = [
    actions.FilterTodoType.ALL,
    actions.FilterTodoType.COMPLETE,
    actions.FilterTodoType.PENDING,
  ];

  public pendientes: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe((filtro) => {
    //   this.filtroActual = filtro;
    // });

    this.store.subscribe((state) => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todo.filter((todo) => {
        return !todo.completado;
      }).length;
    });
  }

  cambiarFiltro(filtro: actions.FilterTodoType) {
    this.store.dispatch(actions.setFiltro({ filtro }));
  }

  parseString(item: any): string {
    return item.toString();
  }

  limpiarFiltro() {
    this.store.dispatch(limpiar());
  }
}
