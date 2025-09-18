import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';


import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {Person } from '../../../models/security/person.model';
import { RouterLink } from '@angular/router';

import { TuiHeader} from '@taiga-ui/layout';
import { TuiTitle } from '@taiga-ui/core';

import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { PersonService } from '../../../service/person.service';
import { CreateModelUser, User } from '../../../models/security/user.model';

@Component({
  selector: 'app-form-user',
  imports: [FormsModule, MatFormFieldModule, 
            MatInputModule, ReactiveFormsModule, 
            MatButtonModule,MatSlideToggleModule,
            RouterLink,TuiTitle,TuiHeader, MatSelectModule,
            MatIconModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})

export class FormUserComponent implements OnInit, OnChanges {
  @Input({required: true})
  title: string = '';

  @Input({required: true})
  actionDescription!: string;

  @Input()
  model?: User;

  @Output()
  posteoForm = new EventEmitter<CreateModelUser>();

  isChecked = true;
  
  servicePerson = inject(PersonService);
  personas: Person[] = [];  


  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    email: ['', {validators: [Validators.required]}],
    personId: ['', {validators: [Validators.required]}],
    password: ['', {validators: [Validators.required]}],
    status: [true],
  });

  
  ngOnInit(): void {
    this.cargarPersonas();

   
  }

  ngOnChanges(): void {
    if(this.model){
      let data : any = {
        email : this.model.email,
        password: '',
        status: this.model.status ? true : false,
       
      }

      this.form.patchValue(data);
      
    }else{

    }
   
  }

  emitirValoresForm(){
    let capture = this.form.getRawValue() ; // caputar los datos del formulario, con los tipo estrictamente definididos

    let parseo: CreateModelUser = {
      email: capture.email,
      password: capture.password,
      status: capture.status ? 1 : 0,
      // personId: parseInt(capture.personId),
    };

    this.posteoForm.emit(parseo);
  }

  cargarPersonas(){
    this.servicePerson.obtenerTodos().subscribe(data =>{
      this.personas = data;
    });
  }


  // funcionalidades de fromEnd
  hideP = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hideP.set(!this.hideP());
    event.stopPropagation();
  }
}
