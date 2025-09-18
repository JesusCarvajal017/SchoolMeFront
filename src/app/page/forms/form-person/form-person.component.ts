import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreateModelPerson, Person } from '../../../models/security/person.model';
import { RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

import { TuiHeader} from '@taiga-ui/layout';
import { TuiButton, TuiDataList, TuiHint, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import {TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
// import { TuiDataListModule } from '@taiga-ui/core';import { TuiDataList } from '@taiga-ui/core';



// import { MatOption } from '@angular/material/select';
import { DocumentTypeService } from '../../../service/parameters/documentType.service';
import { TuiDataListWrapper, TuiPassword, TuiTooltip  } from '@taiga-ui/kit';
import { Gender, GenderType } from '../../../global/model/enumGenero';

import { MatIconModule } from "@angular/material/icon";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';

import { DocumentsType } from '../../../models/parameters/DocumentType.model';
import { DataBasic } from '../../../models/business/dataBasic.mode';
import { Rh } from '../../../models/parameters/rh.model';
import { Departament } from '../../../models/parameters/Departament.model';
import {DepartamentServices } from '../../../service/parameters/Departament.service';
import { MunicipalityService } from '../../../service/parameters/municipality.service';
import { Municipality } from '../../../models/parameters/Municipality.model';
// import { createIdToNameStringify } from '../../../utilities/selectId';


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
    MatCheckboxModule,
    MatStepperModule
  ],
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


  // propiedades de configuracion vista
  isChecked = true;

  // configuraciones de stepe
  isLinear = false;
  isEditable = false;

  // =========================== servicios ========================================
  servicesDocmentType = inject(DocumentTypeService);
  servicesDepartament = inject(DepartamentServices);
  servicesMuncipality = inject(MunicipalityService);
  

  // objeto de tipo documento == models
  documentTypeList : DocumentsType[] = [];
  rhList : Rh[] = [];
  dataBasic : DataBasic[] = [];
  

  // funciona el select con esto
  docNameById = new Map<number, string>();
  

  // idToName = (v: unknown) => createIdToNameStringify(v, this.docNameById);

  // Helper importante
  // solucion rara de select para que en vista se vea, puede tener mejora, si
  idToName = (v: number | string | null | undefined): string => {
    if (v == null) return '';
    const id = typeof v === 'string' ? Number(v) : v;
    return this.docNameById.get(id) ?? '';
  };

  //idicador de activacion usuario
  activeUser !: boolean | null;

  ngOnInit(): void {
    this.cargarDocumentos();
    this.cargarDepartamento();
    this.cargarMunicipio();



    // this.cargarMunicipio();
    // console.log(this.documentTypeList);
  }

  private readonly formBuilder = inject(FormBuilder);
  private readonly dataBasicForm = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    status: [true],
    documentTypeId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    fisrtName: ['', {validators: [Validators.required]}],
    secondName: [''],
    lastName: ['', {validators: [Validators.required]}],
    secondLastName: [''],
    
    identification: new FormControl<number | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<number | null>(null, { validators: [Validators.required] }),
   
    gender: new FormControl<number | null>(null, { validators: [Validators.required] }),
    activeUser : new FormControl<boolean>(false),
  });


  formDataBasic = this.dataBasicForm.nonNullable.group({
    status:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    personId:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    rhId:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    adress: ['', Validators.required],
    brithDate: ['', Validators.required],   // se puede cambiar a Date si quieres manejar fechas
    stratumStatus:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    materialStatusId:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    epsId:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    munisipalityId:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    departamentId:  new FormControl<number | null>(null),
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
      
        // convertir el valor numerico a un valor booleano
        status: this.model.status == 1 ? true : false, 
      }
      //this.form.patchValue(values); // cargar los datos en el formulario
    }
  }

  // utilidades del formulario
  createUser(){
    this.activeUser = this.form.value.activeUser ?? null;
  }

  // funciones principales

  emitirValoresForm(){
    let capture = this.form.getRawValue() ; // caputar los datos del formulario, con los tipo estrictamente definididos

    console.log(capture);

    const dataPerson : any = {
      ...capture,
      status: capture.status ? 1 : 0, // convertir el valor booleano a un valor numerico como lo establece en la db
    }

    this.posteoForm.emit(dataPerson);
  }

  guardarCambios(){

  }

  cargarDocumentos() : void{
    this.servicesDocmentType.obtenerTodos().subscribe(data =>{
      this.documentTypeList = data;
        this.docNameById = new Map(this.documentTypeList.map(d => [d.id, d.name]));
    });
  }

  verData(){
    let capture = this.form.getRawValue() ;
    console.log(capture)
  }

  // la pero chambonada de la historia de la programacion :(, no puedo mejorar esto a menos que se actualize taiga en el proyecto

  // helpers de select 
  generos : Gender[] = GenderType;
  genderNameById = new Map(this.generos.map(d => [d.id, d.name]));

  idToNameGender = (v: number | string | null | undefined): string => {
    if (v == null) return '';
    const id = typeof v === 'string' ? Number(v) : v;
    return this.genderNameById.get(id) ?? '';
  };

  // departament
  departaments : Departament[] = [];
  DepartamentNameById = new Map(this.departaments.map(d => [d.id, d.name]));

  idToNameDepartament = (v: number | string | null | undefined): string => {
    if (v == null) return '';
    const id = typeof v === 'string' ? Number(v) : v;
    return this.DepartamentNameById.get(id) ?? '';
  };


  cargarDepartamento() : void {
    this.servicesDepartament.obtenerTodos().subscribe(data =>{
      this.departaments = data;
        this.DepartamentNameById = new Map(this.departaments.map(d => [d.id, d.name]));
    });
  }

  // municipality
  municipality : Municipality[] = [];
  municipalityNameById = new Map(this.municipality.map(d => [d.id, d.name]));

  idToNameMunicipality = (v: number | string | null | undefined): string => {
    if (v == null) return '';
    const id = typeof v === 'string' ? Number(v) : v;
    return this.municipalityNameById.get(id) ?? '';
  };

  cargarMunicipio() : void {
    this.formDataBasic.controls.departamentId.valueChanges.subscribe(val => {
      this.servicesMuncipality.MunicipiosDepart(val).subscribe(data =>{
        this.municipality = data;
        console.log(this.municipality)
          this.municipalityNameById = new Map(this.municipality.map(d => [d.id, d.name]));
      });
    });    
  }

}


// no funciona intento de crearle un helper

// function idTo(v: number | string | null | undefined, map: Map<number, string>) : string{
    
//       if (v == null) return '';
//       const id = typeof v === 'string' ? Number(v) : v;
//       return map.get(id) ?? '';
// };
