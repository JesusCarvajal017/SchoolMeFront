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
import { TuiTitle, TuiAppearance, TuiAlertService } from '@taiga-ui/core';

// terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

// servicios y modelos
import { ModuleFormService } from '../../../service/module-form.service';
import { ModuleForm } from '../../../models/security/module-form.model';

@Component({
  standalone: true,
  selector: 'app-landing-module-form',
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
    SweetAlert2Module
  ],
  templateUrl: './landing-module-form.component.html',
  styleUrl: './landing-module-form.component.css',
})
export class LandingModuleFormComponent implements OnInit {
  private readonly alerts = inject(TuiAlertService);

  moduleform: ModuleForm[] = [];
  filteredUsers: ModuleForm[] = [];

  // búsqueda
  searchTerm: string = '';

  // paginación
  currentPage: number = 1;
  pageSize: number = 10; // 5 por página
  totalPages: number = 1;

  constructor(private serviceModuleForm: ModuleFormService, private router: Router) {
    this.cargarData();
  }

  ngOnInit(): void {}

  // notificación de estado
  protected showNotification(message: string): void {
    this.alerts.open(message, { label: 'Se a cambiado el estado!' }).subscribe();
  }

  // cargar usuarios desde el servicio
  cargarData() {
    this.serviceModuleForm.obtenerTodos().subscribe((data) => {
      this.moduleform = data;
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
    let filtered = this.moduleform;

    if (this.searchTerm.trim() !== '') {
      filtered = this.moduleform.filter((u) =>
        `${u.moduleName} 
         ${u.formName}`
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

  // obtener usuarios de la página actual
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

  // activar/desactivar usuario
  logical(event: any, id: number) {
    let value: number = event.checked ? 1 : 0;
    let dataSend = { status: value };

    this.serviceModuleForm.eliminarLogico(id, dataSend).subscribe({
      next: () => {
        this.cargarData();
        this.showNotification('Se ha cambiado el estado');
      },
    });
  }

  // eliminar usuario
  deleteRegister(id: number) {
    this.serviceModuleForm.eliminar(id).subscribe(() => {
      Swal.fire('Exitoso', 'El registro ha sido eliminado correctamente', 'success');
      this.cargarData();
    });
  }
}