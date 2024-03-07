import { ActionReducerMap } from '@ngrx/store';
import { Todo } from './todo/models/todo.model';
import { _todoReducer } from './todo/todo.reducer';

import { _filtroReducer } from './filtro/filtro.reducer';
import { FilterTodoType } from './filtro/filtro.actions';

export interface AppState {
  todo: Todo[];
  filtro: FilterTodoType;
}

export const appReducers: ActionReducerMap<AppState> = {
  todo: _todoReducer,
  filtro: _filtroReducer,
};
