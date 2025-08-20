
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PersonaService, Persona } from '../../service/person.service';
import { EditPersonaModalComponent } from '../person-edit/person-edit.component';

@Component({
  selector: 'app-persona-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  template: `
    <table mat-table [dataSource]="personas" class="mat-elevation-z8 w-full">
      <ng-container matColumnDef="nombres">
        <th mat-header-cell *matHeaderCellDef>Nombres</th>
        <td mat-cell *matCellDef="let persona">{{ persona.nombres }}</td>
      </ng-container>

      <ng-container matColumnDef="correo">
        <th mat-header-cell *matHeaderCellDef>Correo</th>
        <td mat-cell *matCellDef="let persona">{{ persona.correo }}</td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let persona">
          <button mat-button color="primary" (click)="openEditModal(persona)">Editar</button>
          <button mat-button color="warn" (click)="deletePersona(persona.id)">Eliminar</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas"></tr>
    </table>
  `,
})
export class PersonaTableComponent implements OnInit {
  private service = inject(PersonaService);
  private dialog = inject(MatDialog);

  personas: Persona[] = [];
  columnas: string[] = ['nombres', 'correo', 'acciones'];

  ngOnInit() {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.service.getPersonas().subscribe((data) => (this.personas = data));
  }

  openEditModal(persona: Persona) {
    const dialogRef = this.dialog.open(EditPersonaModalComponent, {
      width: '400px',
      data: persona,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarPersonas();
    });
  }

  deletePersona(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta persona?')) {
      this.service.deletePersona(id).subscribe(() => this.cargarPersonas());
    }
  }
}
