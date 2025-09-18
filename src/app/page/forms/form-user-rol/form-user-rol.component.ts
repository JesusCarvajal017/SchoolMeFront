import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

// Taiga UI
import { TuiDataList, TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule, TuiSelectModule } from '@taiga-ui/legacy';
import { TuiCheckbox } from '@taiga-ui/kit';
import { MatIconModule } from "@angular/material/icon";

// Modelos y servicios
import { CreateModelUserRol, UserRol } from '../../../models/security/user-rol.model';
import { User } from '../../../models/security/user.model';
import { Rol } from '../../../models/security/rol.model';
import { UserService } from '../../../service/user.service';
import { RolService } from '../../../service/rol.service';

@Component({
  selector: 'app-form-user-rol',
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    MatSlideToggleModule,
    MatSelectModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDataList,
    TuiHint,
    TuiCheckbox, 
    MatIconModule,
    TuiTextfield
  ],
  templateUrl: './form-user-rol.component.html',
  styleUrl: './form-user-rol.component.css'
})
export class FormUserRolComponent implements OnInit, OnChanges {

  @Input({required: true})
  title: string = '';

  @Input({required: true})
  actionDescriptio !: string;

  @Input()
  model?: UserRol;

  @Output()
  posteoForm = new EventEmitter<CreateModelUserRol>();

  // Listas para los dropdowns
  usuarios: User[] = [];
  roles: Rol[] = [];

  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly rolService = inject(RolService);

  form = this.formBuilder.nonNullable.group({
    userId: [0, {validators: [Validators.required, Validators.min(1)]}],
    rolId: [0, {validators: [Validators.required, Validators.min(1)]}],
    status: [true],
  });

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  ngOnChanges(): void {
    if(this.model){
      let values = {
        userId: this.model.userId,
        rolId: this.model.rolId,
        status: this.model.status == 1 ? true : false,
      }
      this.form.patchValue(values);
    }
  }

  // Cargar usuarios activos
  cargarUsuarios(): void {
    this.userService.obtenerTodos(1).subscribe((data) => {
      this.usuarios = data;
    });
  }

  // Cargar roles activos
  cargarRoles(): void {
    this.rolService.obtenerTodos(1).subscribe((data) => {
      this.roles = data;
    });
  }

  // Emitir valores del formulario
  emitirValoresForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let capture = this.form.getRawValue();

    // Obtener nombres para el modelo
    const selectedUser = this.usuarioSeleccionado;
    const selectedRol = this.rolSeleccionado;

    const dataUserRol: CreateModelUserRol = {
      userId: capture.userId,
      rolId: capture.rolId,
      nameUser: selectedUser?.email || '', // Usar email como nameUser
      rolName: selectedRol?.name || '',
      status: capture.status ? 1 : 0,
    }

    this.posteoForm.emit(dataUserRol);
  }

  // Obtener usuario seleccionado para mostrar info
  get usuarioSeleccionado(): User | undefined {
    const userId = this.form.get('userId')?.value;
    return this.usuarios.find(u => u.id === userId);
  }

  // Obtener rol seleccionado para mostrar info
  get rolSeleccionado(): Rol | undefined {
    const rolId = this.form.get('rolId')?.value;
    return this.roles.find(r => r.id === rolId);
  }
}