import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  borrar,
  create,
  editar,
  limpiar,
  toggle,
  toggleAll,
} from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Salvar el mundo'),
  new Todo('Vencer a Tanos'),
  new Todo('Comprar traje de iron man'),
  new Todo('Robar escudo del capitan america'),
];

export const _todoReducer = createReducer(
  initialState,
  on(create, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        //// importante:
        /**
         * Al usar el operador Spread (...) permite generar un nuevo objeto del mismo tipo, trae todos los atributos
         * pero no muta el objeto genera uno nuevo, se tiene que evitar para todos los casos de los reducer mutar los
         * objetos para no usar la memoria o referencia del objeto inicial creada.
         *
         */
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(borrar, (state, { id }) =>
    state.filter((todo) => {
      return todo.id !== id;
    })
  ),
  on(toggleAll, (state, { estado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado: estado,
      };
    });
  }),
  on(limpiar, (state) => {
    return state.filter((todo) => !todo.completado);
  })
);
