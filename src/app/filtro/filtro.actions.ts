import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export class FilterTodoType {
  static ALL: filtrosValidos = 'todos';
  static COMPLETE: filtrosValidos = 'completados';
  static PENDING: filtrosValidos = 'pendientes';
}

export const setFiltro = createAction(
  '[Filtro] Set Filtro',
  props<{ filtro: FilterTodoType }>()
);
