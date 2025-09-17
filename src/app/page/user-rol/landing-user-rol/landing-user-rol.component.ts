import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

// taiga-ui
import { TuiHeader } from '@taiga-ui/layout';
import { TuiButtonGroup } from '@taiga-ui/kit';
import { TuiTitle, TuiAppearance, TuiAlertService, TuiButton, TuiDialog, TuiHint } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';

// terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

// servicios y modelos
import { UserRolService } from '../../../service/user-rol.service';
import { UserRol, CreateModelUserRol } from '../../../models/user-rol.model';
import { FormUserRolComponent } from "../../forms/form-user-rol/form-user-rol.component";

@Component({
  standalone: true,
  selector: 'app-landing-user-rol',
  imports: [
    CommonModule,
    TuiTitle,
    MatSidenavModule,
    MatCardModule,
    TuiHeader,
    TuiButtonGroup,
    TuiAppearance,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    SweetAlert2Module,
    TuiDialog,
    TuiHint,
    TuiInputModule,
    FormUserRolComponent
  ],
  templateUrl: './landing-user-rol.component.html',
  styleUrl: './landing-user-rol.component.css',
})
export class LandingUserRolComponent implements OnInit {

  // Atributos importantes del módulo
  userRol: UserRol[] = [];
  filteredUsers: UserRol[] = [];
  indicadorActive: number = 1;

  // titulo de los modales, según la acción a realizar del crud
  titleForm!: string;

  // NUEVAS PROPIEDADES PARA EL MODAL
  modelUserRol?: UserRol; // Para editar un user-rol existente
  isEditMode: boolean = false; // Indica si estamos editando o creando

  //  ======================= funcionalidad del modal del taiga =======================
  protected open = false;

  // MÉTODO ACTUALIZADO para manejar creación y edición
  protected modalCommand(title: string, userRol?: UserRol): void { 
      this.titleForm = title;
      this.isEditMode = !!userRol; // true si userRol existe, false si es undefined
      this.modelUserRol = userRol; // undefined para crear, objeto UserRol para editar
      this.open = true;
  }

  // NUEVO MÉTODO para manejar el submit del formulario
  handleUserRolSubmit(data: CreateModelUserRol): void {
    if (this.isEditMode && this.modelUserRol) {
      // Actualizar user-rol existente
      const updateData: CreateModelUserRol = {
        ...data,
        // id: this.modelUserRol.id  // Si tu CreateModelUserRol necesita ID para actualizar
      };
      
      this.serviceUserRol.actualizar(updateData).subscribe({
        next: () => {
          Swal.fire("Exitoso", "Asignación actualizada correctamente", "success");
          this.closeModal();
          this.cargarData(this.indicadorActive); // Recargar la lista
        },
        error: (err) => {
          Swal.fire("Error", "No se pudo actualizar la asignación", "error");
          console.error(err);
        }
      });
    } else {
      // Crear nueva asignación user-rol
      this.serviceUserRol.crear(data).subscribe({
        next: () => {
          Swal.fire("Exitoso", "Asignación creada correctamente", "success");
          this.closeModal();
          this.cargarData(this.indicadorActive); // Recargar la lista
        },
        error: (err) => {
          Swal.fire("Error", "No se pudo crear la asignación", "error");
          console.error(err);
        }
      });
    }
  }

  // NUEVO MÉTODO para cerrar modal y limpiar datos
  closeModal(): void {
    this.open = false;
    this.modelUserRol = undefined;
    this.isEditMode = false;
  }
  //  ======================= end =======================

  // servicio de alerta de taiga
  private readonly alerts = inject(TuiAlertService);

  // búsqueda
  searchTerm: string = '';

  // paginación
  currentPage: number = 1;
  pageSize: number = 5; // 5 por página
  totalPages: number = 1;

  constructor(private serviceUserRol: UserRolService, private router: Router) {
    this.cargarData();
  }

  ngOnInit(): void {}

  // notificación de estado
  protected showNotification(message: string): void {
    this.alerts.open(message, { label: 'Se ha cambiado el estado!' }).subscribe();
  }

  cambiarStatus(status: number){
    this.indicadorActive = status;
    this.cargarData(this.indicadorActive);
  }

  // cargar user-roles desde el servicio
  cargarData(status: number = 1) {
    this.serviceUserRol.obtenerTodos(status).subscribe((data) => {
      this.userRol = data;
      this.applyFilters();
    });
  }

  // búsqueda
  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  // aplicar búsqueda + paginación
  applyFilters() {
    let filtered = this.userRol;

    if (this.searchTerm.trim() !== '') {
      filtered = this.userRol.filter((ur) =>
        `${ur.nameUser} ${ur.rolName}`
          .toLowerCase()
          .includes(this.searchTerm)
      );
    }

    this.filteredUsers = filtered;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);

    // corregir página actual si es mayor al total
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  // obtener user-roles de la página actual
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  // cambiar de página
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // activar/desactivar user-rol
  logical(event: any, id: number) {
    let value: number = event.checked ? 1 : 0;
    let dataSend = { status: value };

    this.serviceUserRol.eliminarLogico(id, dataSend).subscribe({
      next: () => {
        this.cargarData(this.indicadorActive);
        this.showNotification('Se ha cambiado el estado');
      },
    });
  }

  // eliminar user-rol
  deleteRegister(id: number) {
    this.serviceUserRol.eliminar(id).subscribe(() => {
      Swal.fire('Exitoso', 'El registro ha sido eliminado correctamente', 'success');
      this.cargarData(this.indicadorActive);
    });
  }
}