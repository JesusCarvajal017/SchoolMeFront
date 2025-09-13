import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreateModelPerson, Person } from '../../../models/person.model';
import { RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

import { TuiHeader} from '@taiga-ui/layout';
import { TuiButton, TuiDataList, TuiHint, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import {TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';



// import { MatOption } from '@angular/material/select';
import { DocumentTypeService } from '../../../service/parameters/documentType.service';
import { TuiDataListWrapper, TuiPassword, TuiTooltip } from '@taiga-ui/kit';
import { GenderType } from '../../../global/model/enumGenero';

import { MatIconModule } from "@angular/material/icon";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-form-person',
  imports: [FormsModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatSlideToggleModule,
    RouterLink, TuiTitle, TuiHeader, MatSelectModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapper,
    TuiDataList,
    TuiHint,
    TuiInputNumberModule,
    MatIconModule,
    TuiIcon,
    TuiPassword,
    TuiTextfield,
    TuiTooltip,
    TuiHint,
    TuiInputDateModule,
    TuiButton,
    MatTabsModule,
    MatCheckboxModule, LoaderComponent],
  templateUrl: './form-person.component.html',
  styleUrl: './form-person.component.css'
})
export class FormPersonComponent implements OnInit,OnChanges { 

  protected value = '';
  
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

  // objeto de tipo documento
  documentTypeList : any[] = []; 

  // enum de genero
  generos = GenderType.map(g => g.name);

  //idicador de activacion usuario
  activeUser !: boolean | null;

  ngOnInit(): void {
    this.servicesDocmentType.obtenerTodos().subscribe(data =>{
      this.documentTypeList = data;
    });
  }

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    status: [true],
    documentTypeId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    fisrtName: ['', {validators: [Validators.required]}],
    secondName: ['', {validators: [Validators.required]}],
    lastName: ['', {validators: [Validators.required]}],
    secondLastName: ['', {validators: [Validators.required]}],
    
    // documentTypeId: [Number , { validators: [Validators.required] }],


    // nation: ['', {validators: [Validators.required]}],
    identification: ['', {validators: [Validators.required]}],
    phone: ['', {validators: [Validators.required]}],
   
    gender: new FormControl<number | null>(null, { validators: [Validators.required] }),
    // age: [0, {validators: [Validators.required]}],
    activeUser : new FormControl<boolean>(false),
  });

  

  ngOnChanges(): void {
    if(this.model){

      let values = {
        fisrtName: this.model.fisrtName,
        secondName: this.model.secondName,
        lastName: this.model.lastName,
        secondLastName: this.model.secondLastName,
        identification: this.model.identification,
        phone: this.model.phone,
        documentTypeId: this.model.documentTypeId,
        gender: this.model.gender,
      
        status: this.model.status == 1 ? true : false, // convertir el valor numerico a un valor booleano
      }
      this.form.patchValue(values); // cargar los datos en el formulario
    }
  }

  // utilidades del formulario
  createUser(){
    this.activeUser = this.form.value.activeUser ?? null;
  }

  

  // funciones principales

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


  protected items = [
    'Luke Skywalker',
    'Leia Organa Solo',
    'Darth Vader',
    'Han Solo',
    'Obi-Wan Kenobi',
    'Yoda',
  ];
 
    // protected testValue = new FormControl<string | null>(null);
}
