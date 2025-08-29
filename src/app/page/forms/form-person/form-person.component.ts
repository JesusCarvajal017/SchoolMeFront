import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreateModelPerson, Person } from '../../../models/person.model';
import { RouterLink } from '@angular/router';
import { TuiHeader} from '@taiga-ui/layout';
import { TuiTitle } from '@taiga-ui/core';
import {MatSelectModule} from '@angular/material/select';

// import { MatOption } from '@angular/material/select';
import { DocumentTypeService } from '../../../service/parameters/documentType.service';
import { MatOption } from "../../../../../node_modules/@angular/material/option.d-ef4idHSb";
;

@Component({
  selector: 'app-form-person',
  imports: [FormsModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatSlideToggleModule,
    RouterLink, TuiTitle, TuiHeader,MatSelectModule],
  templateUrl: './form-person.component.html',
  styleUrl: './form-person.component.css'
})
export class FormPersonComponent implements OnInit,OnChanges { 
  @Input({required: true})
  title: string = '';

  @Input({required: true})
  actionDescriptio !: string;

  @Input()
  model?: Person;

  @Output()
  posteoForm = new EventEmitter<CreateModelPerson>();

  isChecked = true;

  servicesDocmentType = inject(DocumentTypeService);

  documentTypeList : any[] = []; 

  genero = [
    {id: 1,value: 'M', name: 'Masculino'},
    {id: 2,value: 'F', name: 'Femenino'},
    {id: 3,value: 'O', name: 'Otro'},
  ];


  ngOnInit(): void {
    this.servicesDocmentType.obtenerTodos().subscribe(data =>{
      this.documentTypeList = data;
      
    });
  }

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    fisrtName: ['', {validators: [Validators.required]}],
    secondName: ['', {validators: [Validators.required]}],
    secondLastName: ['', {validators: [Validators.required]}],
    // documentTypeId: [Number , { validators: [Validators.required] }],


    // nation: ['', {validators: [Validators.required]}],
    identification: ['', {validators: [Validators.required]}],
    phone: ['', {validators: [Validators.required]}],
    lastName: ['', {validators: [Validators.required]}],
   
    documentTypeId: new FormControl<number | null>(null, { validators: [Validators.required] }),
gender: new FormControl<number | null>(null, { validators: [Validators.required] }),
    // age: [0, {validators: [Validators.required]}],
    status: [true],
  });

  ngOnChanges(): void {
    if(this.model){

      // let dataValue = 

      let values = {
        // ...this.model,
        fisrtName: this.model.fisrtName,
        secondName: this.model.secondName,
        lastName: this.model.lastName,
        secondLastName: this.model.secondLastName,
        identification: this.model.identification,
        phone: this.model.phone,
        documentTypeId: this.model.documentTypeId,
        gender: this.model.gender,
        // gender: this.,
      
        status: this.model.status == 1 ? true : false, // convertir el valor numerico a un valor booleano
      }
      this.form.patchValue(values); // cargar los datos en el formulario
    }
  }

  emitirValoresForm(){
    let capture = this.form.getRawValue() ; // caputar los datos del formulario, con los tipo estrictamente definididos

    const dataPerson : any = {
      ...capture,
      status: capture.status ? 1 : 0, // convertir el valor booleano a un valor numerico como lo establece en la db
    }

    this.posteoForm.emit(dataPerson);
  }

  guardarCambios(){

  }
}
