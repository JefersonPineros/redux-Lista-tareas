import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;

  public chkCompletado: FormControl;

  public txtInput: FormControl;

  public editando: boolean = false;

  @ViewChild('inputFisico') txtFisico: ElementRef | undefined;

  constructor(private store: Store<AppState>) {
    this.chkCompletado = new FormControl();
    this.txtInput = new FormControl();
  }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo!.completado);

    this.txtInput = new FormControl(this.todo!.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe((valor) => {
      this.store.dispatch(toggle({ id: this.todo.id }));
    });

    this.store.select('todo').subscribe((todo) => {
      let item = todo.find((item) => {
        return item.id === this.todo.id;
      });
      if (item && this.chkCompletado.value !== item.completado) {
        this.chkCompletado.setValue(item.completado, { emitEvent: false });
      }
    });
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);

    setTimeout(() => {
      this.txtFisico?.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid || this.txtInput.value === this.todo.texto) {
      return;
    }
    this.store.dispatch(
      editar({ id: this.todo.id, texto: this.txtInput.value })
    );
  }
  borrar() {
    this.store.dispatch(borrar({ id: this.todo.id }));
  }
}
