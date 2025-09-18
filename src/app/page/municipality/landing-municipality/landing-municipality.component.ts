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
import { TuiButtonGroup  } from '@taiga-ui/kit';
import { TuiTitle, TuiAppearance, TuiAlertService, TuiButton, TuiDialog, TuiHint } from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/legacy';

// terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

// servicios y modelos
// import { MunicipalityService } from '../../../service/parameters/municipality.service'; // Agregar CreateModelRol
import { FormMunicipalityComponent } from "../../forms/form-municipality/form-municipality.component";
import { MunicipalityService } from '../../../service/parameters/municipality.service';
import { CreateMunicipality, Municipality } from '../../../models/parameters/Municipality.model';

@Component({
  standalone: true,
  selector: 'app-landing-municipality',
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
    // RouterLink,
    SweetAlert2Module,
    // TuiButton,
    TuiDialog,
    TuiHint,
    TuiInputModule,
    FormMunicipalityComponent
],
  templateUrl: './landing-municipality.component.html',
  styleUrl: './landing-municipality.component.css',
})
export class LandingMunicipalityComponent implements OnInit {

  // Atributos importantes de modulo
  municipality: Municipality[] = [];
  filteredUsers: Municipality[] = [];
  idicadorActive : number = 1;

  // titulo de los modales, segun la acción a relizar del crud
  titleForm!: string;

  // NUEVAS PROPIEDADES PARA EL MODAL
  modelMunicipality?: Municipality; // Para editar un rol existente
  isEditMode: boolean = false; // Indica si estamos editando o creando
  
  //  ======================= funcionalidad del modal del taiga =======================
  protected open = false;

  // MÉTODO ACTUALIZADO para manejar creación y edición
  protected modalCommand(title: string, grade?: Municipality): void { 
      this.titleForm = title;
      this.isEditMode = !!grade; // true si rol existe, false si es undefined
      this.modelMunicipality = grade; // undefined para crear, objeto Rol para editar
      this.open = true;
  }

  // NUEVO MÉTODO para manejar el submit del formulario
  handleMunicipalitySubmit(data: CreateMunicipality): void {
    
    if (this.isEditMode && this.modelMunicipality) {
      // Actualizar rol existente
      const updateData: CreateMunicipality = {
        ...data,
        id: this.modelMunicipality.id
      };
      
      this.serviceMunicipality.actualizar(updateData).subscribe({
        next: () => {
          Swal.fire("Exitoso", "Grade actualizado correctamente", "success");
          this.closeModal();
          this.cargarData(this.idicadorActive); // Recargar la lista
        },
        error: (err) => {
          Swal.fire("Error", "No se pudo actualizar el rol", "error");
          console.error(err);
        }
      });
    } else {
      // Crear nuevo rol
      this.serviceMunicipality.crear(data).subscribe({
        next: () => {
          Swal.fire("Exitoso", "Rol creado correctamente", "success");
          this.closeModal();
          this.cargarData(this.idicadorActive); // Recargar la lista
        },
        error: (err) => {
          Swal.fire("Error", "No se pudo crear el rol", "error");
          console.error(err);
        }
      });
    }
  }

  // NUEVO MÉTODO para cerrar modal y limpiar datos
  closeModal(): void {
    this.open = false;
    this.modelMunicipality = undefined;
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

  constructor(private serviceMunicipality: MunicipalityService, private router: Router) {
    this.cargarData();
  }

  ngOnInit(): void {}

  // notificación de estado
  protected showNotification(message: string): void {
    this.alerts.open(message, { label: 'Se a cambiado el estado!' }).subscribe();
  }

  cambiarStatus(status : number){
    this.idicadorActive = status;
    this.cargarData(this.idicadorActive);
  }

  // cargar roles desde el servicio
  cargarData(status : number = 1) {
    this.serviceMunicipality.obtenerTodos(status).subscribe((data) => {
      this.municipality = data;
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
    let filtered = this.municipality;

    if (this.searchTerm.trim() !== '') {
      filtered = this.municipality.filter((r) =>
        `${r.name}`
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

  // obtener roles de la página actual
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

  // activar/desactivar rol
  logical(event: any, id: number) {
    let value: number = event.checked ? 1 : 0;
    let dataSend = { status: value };

    this.serviceMunicipality.eliminarLogico(id, dataSend).subscribe({
      next: () => {
        this.cargarData(this.idicadorActive);
        this.showNotification('Se ha cambiado el estado');
      },
    });
  }

  // eliminar rol
  deleteRegister(id: number) {
    this.serviceMunicipality.eliminar(id).subscribe(() => {
      Swal.fire('Exitoso', 'El registro ha sido eliminado correctamente', 'success');
      this.cargarData(this.idicadorActive);
    });
  }
}