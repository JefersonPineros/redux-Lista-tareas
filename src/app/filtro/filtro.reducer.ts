import { createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos, FilterTodoType } from './filtro.actions';

export const initialState: FilterTodoType = FilterTodoType.ALL;

export const _filtroReducer = createReducer(
  initialState,
  on(setFiltro, (state, { filtro }) => filtro)
);
