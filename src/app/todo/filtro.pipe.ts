import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { FilterTodoType } from '../filtro/filtro.actions';

@Pipe({
  name: 'filtroTodo',
})
export class FiltroPipe implements PipeTransform {
  transform(todo: Todo[], filtro: FilterTodoType): Todo[] {
    switch (filtro) {
      case 'completados':
        console.log(todo.filter((todo) => todo.completado));

        return todo.filter((todo) => todo.completado);
      case 'pendientes':
        return todo.filter((todo) => !todo.completado);
      default:
        return todo;
    }
  }
}
