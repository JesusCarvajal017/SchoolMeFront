import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormPersonComponent } from '../../forms/form-person/form-person.component';
import { CreateModelPerson, Person } from '../../../models/person.model';
import { PersonService } from '../../../service/person.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-person',
  imports: [FormPersonComponent],
  templateUrl: './editar-person.component.html',
  styleUrl: './editar-person.component.css'
})
export class EditarPersonComponent implements OnInit {

  @Input({transform: numberAttribute})
  id!: number;

  person: Person[] = [];
  model?: Person;

  servviceEntity = inject(PersonService); 
  router = inject(Router);

  title : string = '';

  ngOnInit(): void {
    this.queryEntity(this.id);
    
    // if(this.model){
    //   this.form
    // }


    this.title = `editar persona`;
  }

  // constructor() { 
    
  // }

  queryEntity(id: number){
    this.servviceEntity.obtenerPorId(id).subscribe(data =>{
      this.model = data;
      console.log(data);
      // console.log(this.model);
    });
  }

  editEntity(data: CreateModelPerson){
    let { fisrtName, secondName, lastName, secondLastName, identification, phone, gender, documentTypeId, status } = data;

    let pre_data : CreateModelPerson = {
      id: this.id,
      identification,
      fisrtName,
      secondName,
      lastName,
      secondLastName,
      phone,
      gender,
      documentTypeId,
      status: status ? 1 : 0, // convertir el valor booleano a un valor numerico
    }

  //   {
  //     "lastName": "Guerrerooooo",
  //     "identification": 1077224695,
  //     "fisrtName": "Juan",
  //     "secondName": "Felipe",
  //     "secondLastName": "Fandiñooooooooooooooo",
  //     "documentTypeId": 1,
  //     "nation": "string",
  //     "phone": 3153686037,
  //     "gender": 20,
  //     "id": 6,
  //     "status": 1
  // }
    console.log(this.model);
    console.log(pre_data); 

    // console.log(data);
    this.servviceEntity.actualizar(pre_data).subscribe(
      {next: () => {
          // console.log('actualizado');
          Swal.fire("Exitoso", "Actualizacion exitosa", "success");
          this.router.navigate(['dashboard/todos']);
  
    }});
  }


}


