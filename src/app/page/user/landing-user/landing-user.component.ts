
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

// agular material
import {MatButtonModule} from '@angular/material/button';

// taiga
import {TuiButtonGroup} from '@taiga-ui/kit';
import { TuiHeader} from '@taiga-ui/layout';
import { TuiAlertService, TuiTitle } from '@taiga-ui/core';

import { UserService } from '../../../service/user.service';
import { ListadoGenericoComponent } from '../../../components/listado-generico/listado-generico.component';
import { PersonService } from '../../../service/person.service';
import { User } from '../../../models/user.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-landing-user',
  imports: [MatIconModule, ListadoGenericoComponent,
            MatSlideToggleModule, RouterLink, 
            SweetAlert2Module,MatButtonModule,
            TuiButtonGroup, TuiHeader, TuiTitle, NgClass],
  templateUrl: './landing-user.component.html',
  styleUrl: './landing-user.component.css'
})
export class LandingUserComponent {
  user!: User[];

  serviceUser = inject(UserService);
  servicesPerson = inject(PersonService);

  alerts = inject(TuiAlertService);

  protected showNotification(message: string): void {
    this.alerts
        .open(message, {label: 'Se a cambiado el estado!'})
        .subscribe();
}


  constructor(){
    this.cargarData();
  }

  cargarData(){
    this.serviceUser.obtenerTodos().subscribe(data => {
      this.user = data;
    });
  }

  logical(event: any, id : number){
    let checked: number = event.checked ? 1 : 0;

    let dataStatus = {
      status: checked
    }

    this.serviceUser.eliminarLogico(id,dataStatus).subscribe({
      next: ()=>{
        this.cargarData();
        this.showNotification("Se ha cambiado el estado");
      }
    }
      
    );

  }

  deleteRegister(id: number){
    this.serviceUser.eliminar(id).subscribe({
      next: ()=>{
         Swal.fire("Exitoso", "El registro ha sido eliminado correctamente", "success");
          this.cargarData();
      }
    });
  }

}
