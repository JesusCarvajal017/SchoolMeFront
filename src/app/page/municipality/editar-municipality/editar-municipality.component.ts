import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormEpsComponent } from '../../forms/form-eps/form-eps.component';
import { CreateModelMunicipality, Municipality } from '../../../models/municipality.model';
import { MunicipalityService } from '../../../service/parameters/municipality.service';
import { FormMunicipalityComponent } from '../../forms/form-municipality/form-municipality.component';

@Component({
  selector: 'app-editar-municipality',
  imports: [FormMunicipalityComponent],
  templateUrl: './editar-municipality.component.html',
  styleUrl: './editar-municipality.component.css'
})
export class EditarMunicipalityComponent implements OnInit {

  @Input({transform: numberAttribute})
  id!: number;

  module: Municipality[] = [];
  model?: Municipality;

  servviceEntity = inject(MunicipalityService);

  router = inject(Router);

  title : string = '';

  ngOnInit(): void {
    this.queryEntity(this.id);
    
    this.title = `Editar municipio`;
  }

  queryEntity(id: number){
    this.servviceEntity.obtenerPorId(id).subscribe(data =>{
      this.model = data;
      console.log(data);
    });
  }

  editEntity(data: CreateModelMunicipality){
    let { name, status } = data;

    let pre_data : CreateModelMunicipality = {
      id: this.id,
      name,
      departmentId: this.model ? this.model.departmentId : 0,
      status: status ? 1 : 0, // convertir el valor booleano a un valor numerico
    }

    console.log(this.model);
    console.log(pre_data);

    this.servviceEntity.actualizar(pre_data).subscribe(
      {next: () => {
          Swal.fire("Exitoso", "Actualizacion exitosa", "success");
          this.router.navigate(['dashboard/modulos']);
       }});
  }
}