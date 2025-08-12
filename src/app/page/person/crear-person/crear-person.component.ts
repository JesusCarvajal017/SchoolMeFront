import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {  Validators } from '@angular/forms';
// import {MatButtonModule} from '@angular/material/button';

import { TuiTitle } from '@taiga-ui/core';
import { TuiHeader} from '@taiga-ui/layout';

import { PersonService } from '../../../service/person.service';
import { FormPersonComponent } from "../../forms/form-person/form-person.component";
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-person',
  imports: [MatButtonModule, FormPersonComponent],

  templateUrl: './crear-person.component.html',
  styleUrl: './crear-person.component.css'
})
export class CrearPersonComponent {
  title = 'Registar Persona';
  serviceEntity = inject(PersonService);
  router = inject(Router);

  guardarCambios(data: any){

    this.serviceEntity.crear(data).subscribe({
      next: ()=>{
         Swal.fire("Exitoso", "Registro exitoso", "success");
        this.router.navigate(["/person"]);
      }

    });
 
  }
}
