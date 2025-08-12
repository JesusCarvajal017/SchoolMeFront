import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// agular matarial
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

import { ListadoGenericoComponent } from '../../../components/listado-generico/listado-generico.component';
import { PersonService } from '../../../service/person.service';
import { Person } from '../../../models/person.model';
import { ModelLogicalDelete } from '../../../global/model/logicalDelete.model';

// taiga-ui
import { TuiHeader} from '@taiga-ui/layout';
import {TuiButtonGroup} from '@taiga-ui/kit';
import { TuiTitle,TuiAppearance, TuiAlertService } from '@taiga-ui/core';

// terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AutorizadoComponent } from "../../../auth/autorizado/autorizado.component";

@Component({
  standalone: true, 
  selector: 'app-lading-page',
  imports: [CommonModule, ListadoGenericoComponent, TuiTitle, MatSidenavModule,
    MatCardModule, TuiHeader, TuiButtonGroup, TuiAppearance,
    MatIconModule, MatSlideToggleModule, MatButtonModule, RouterLink, SweetAlert2Module, AutorizadoComponent],
  templateUrl: './lading-page.component.html',
  styleUrl: './lading-page.component.css'
})
export class LadingPageComponent implements OnInit {

  private readonly alerts = inject(TuiAlertService);
 
  protected showNotification(message: string): void {
      this.alerts
          .open(message, {label: 'Se a cambiado el estado!'})
          .subscribe();
  }

  cheecked = false;
  
  ngOnInit(): void {
    // console.log(this.persons);
      // this.persons;
  }
  
  // pelicula?: any[];
  router = inject(Router);
  serviceEntity = inject(PersonService);
  persons?: Person[] = [];


  constructor(){
    this.cargarProducto();
  }

  cargarProducto(){
    this.serviceEntity.obtenerTodos().subscribe(data =>{
      this.persons = data;
    });
  }

  logical(event: any, id: number){
    let value : number =  event.checked ? 1 : 0;

    let dataSend = {status: value};

    this.serviceEntity.eliminarLogico(id,dataSend).subscribe({
      next: ()=>{
       this.cargarProducto();
       this.showNotification("Se ha cambiado el estado");
      }
    });
  
    // console.log(event.checked);
    // this.cheecked = event.checked;

  }

  deleteRegister(id: number){
    console.log(id);
    this.serviceEntity.eliminar(id).subscribe( ()=> {
      Swal.fire("Exitoso", "El registro ha sido eliminado correctamente", "success");
      this.cargarProducto();
    });
  }


  // this.persons.status = 

}
