import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreateModelPerson, Person } from '../../../models/person.model';
import { RouterLink } from '@angular/router';
import { TuiHeader} from '@taiga-ui/layout';
import { TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'app-form-person',
  imports: [FormsModule, MatFormFieldModule, 
            MatInputModule, ReactiveFormsModule, 
            MatButtonModule,MatSlideToggleModule,
            RouterLink,TuiTitle,TuiHeader],
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

  ngOnInit(): void {
      
  }

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    fisrtName: ['', {validators: [Validators.required]}],
    secondName: ['', {validators: [Validators.required]}],
    secondLastName: ['', {validators: [Validators.required]}],
    nation: ['', {validators: [Validators.required]}],
    identification: ['', {validators: [Validators.required]}],
    phone: ['', {validators: [Validators.required]}],
    lastName: ['', {validators: [Validators.required]}],
    gender: ['', {validators: [Validators.required]}],
    age: [0, {validators: [Validators.required]}],
    status: [true],
  });

  ngOnChanges(): void {
    if(this.model){
      let values = {
        ...this.model,
        status: this.model.status == 1 ? true : false, // convertir el valor numerico a un valor booleano
      }
      this.form.patchValue(values); // cargar los datos en el formulario
    }
  }

  emitirValoresForm(){
    let capture = this.form.getRawValue() ; // caputar los datos del formulario, con los tipo estrictamente definididos

  const dataPerson : CreateModelPerson = {
      ...capture,
      status: capture.status ? 1 : 0, // convertir el valor booleano a un valor numerico como lo establece en la db
    }

    this.posteoForm.emit(dataPerson);
  }

  guardarCambios(){

  }
}
