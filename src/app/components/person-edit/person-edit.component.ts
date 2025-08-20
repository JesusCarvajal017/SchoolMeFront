
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonaService, Persona } from '../../service/person.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-persona-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  template: `
    <h2>Editar Persona</h2>
    <form (ngSubmit)="guardar()">
      <label>Nombre:</label>
      <input [(ngModel)]="persona.nombres" name="nombres" />

      <label>Correo:</label>
      <input [(ngModel)]="persona.correo" name="correo" />

      <button mat-button type="submit" color="primary">Guardar</button>
      <button mat-button type="button" (click)="cerrar()">Cancelar</button>
    </form>
  `,
})
export class EditPersonaModalComponent {
  persona: Persona;

  constructor(
    private service: PersonaService,
    private dialogRef: MatDialogRef<EditPersonaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Persona
  ) {
    this.persona = { ...data };
  }

  guardar() {
    this.service.updatePersona(this.persona.id, this.persona).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cerrar() {
    this.dialogRef.close(false);
  }
}
