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
import { PersonService } from '../../../service/person.service';
import { FormPersonValue, Person } from '../../../models/security/person.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormPersonComponent } from "../../forms/form-person/form-person.component";
import { FormTodosComponent } from "../../forms/form-todos/form-todos.component";

@Component({
  standalone: true,
  selector: 'app-lading-page',
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
    RouterLink,
    SweetAlert2Module,
    // TuiAutoFocus,
    TuiDialog,
    TuiHint,
    TuiInputModule,
    FormTodosComponent
],
  templateUrl: './lading-page.component.html',
  styleUrl: './lading-page.component.css',
})
export class LadingPageComponent implements OnInit {

  // Atributos importantes de modulo
  persons: Person[] = [];
  filteredPersons: Person[] = [];
  idicadorActive : number = 1;

  // titulo de los modales, segun la acción a relizar del crud
  titleForm!: string;

  
  //  ======================= funcionalidad del modal del taiga =======================
  protected open = false;

  protected modalCommand(title: string): void { 
      this.titleForm = title;
      this.open = true;
  }
  //  ======================= end =======================


  // servicio de alerta de taiga
  private readonly alerts = inject(TuiAlertService);

  // búsqueda
  searchTerm: string = '';

  // paginación
  currentPage: number = 1;
  pageSize: number = 6; // 10 por página
  totalPages: number = 1;


  // ================= servicios api =======================
  serviceEntity =  inject(PersonService);
  roter = inject(Router);


  ngOnInit(): void {
    this.cargarData();

  }

  // notificación de estado
  protected showNotification(message: string): void {
    this.alerts.open(message, { label: 'Se a cambiado el estado!' }).subscribe();
  }

  cambiarStatus(status : number){
    this.idicadorActive = status;
    this.cargarData(this.idicadorActive);
  }

  // cargar personas desde el servicio
  cargarData(status : number = 1) {
    this.serviceEntity.obtenerTodos(status).subscribe({
      next:(data) => {
        this.persons = data;
        this.applyFilters();
      }
    });
  }

  // búsqueda
  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  // aplicar búsqueda + paginación
  applyFilters() {
    let filtered = this.persons;

    if (this.searchTerm.trim() !== '') {
      filtered = this.persons.filter((p) =>
        `${p.fisrtName} ${p.secondName} ${p.lastName} ${p.secondLastName} ${p.identification} ${p.phone}`
          .toLowerCase()
          .includes(this.searchTerm)
      );
    }

    this.filteredPersons = filtered;
    this.totalPages = Math.ceil(this.filteredPersons.length / this.pageSize);

    // corregir página actual si es mayor al total
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  // obtener personas de la página actual
  get paginatedPersons() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredPersons.slice(start, start + this.pageSize);
  }

  // cambiar de página
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // activar/desactivar persona
  logical(event: any, id: number) {
    let value: number = event.checked ? 1 : 0;
  

    this.serviceEntity.eliminarLogico(id, value).subscribe({
      next: () => {
        this.cargarData(this.idicadorActive);
        this.showNotification('Se ha cambiado el estado');
        console.log(this.idicadorActive);
      },
    });
  }

  // Eliminar registro de la entidad
  deleteRegister(id: number) {
    this.serviceEntity.eliminar(id).subscribe({
      next: ()=>{
        Swal.fire('Exitoso', 'El registro ha sido eliminado correctamente', 'success');
        this.cargarData();

      },
      error : (error)=> {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.detail,
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        console.log(error);
      } 
    });
  }






  // =================================================== Metodos de los modales ==================================================

  //NUEVO MÉTODO para manejar el submit del formulario
  handleEpsSubmit(data: FormPersonValue): void {
    if (this.isEditMode && this.modelEps) {

      // Actualizar rol existente
      const updateData: CreateModelEps = {
        ...data,
        id: this.modelEps.id
      };
      
      this.serviceEps.actualizar(updateData).subscribe({
        next: () => {
          Swal.fire("Exitoso", "eps actualizado correctamente", "success");
          this.closeModal();
          this.cargarData(this.idicadorActive); // Recargar la lista
        },
        error: (err) => {
          Swal.fire("Error", "No se pudo actualizar la eps", "error");
          console.error(err);
        }
      });
    } else {
      // Crear nuevo rol
      this.serviceEps.crear(data).subscribe({
        next: () => {
          Swal.fire("Exitoso", "Eps creado correctamente", "success");
          this.closeModal();
          this.cargarData(this.idicadorActive); // Recargar la lista
        },
        error: (err) => {
          Swal.fire("Error", "No se pudo crear la eps", "error");
          console.error(err);
        }
      });
    }
  }

}
