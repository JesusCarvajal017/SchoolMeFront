import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateModelUserRol, UserRol } from '../../../models/security/user-rol.model';
import { RouterLink } from '@angular/router';

import { TuiHeader } from '@taiga-ui/layout';
import { TuiDataList, TuiHint, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule, TuiSelectModule } from '@taiga-ui/legacy';

import { TuiCheckbox, TuiDataListWrapper, TuiTooltip } from '@taiga-ui/kit';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

// Importar servicios para obtener usuarios y roles
import { GroupsService } from '../../../service/parameters/groups.service';
import { TeacherService } from '../../../service/parameters/teacher.service';
import { Teacher } from '../../../models/parameters/teacher.model';
import { CreateModelGroupDirector, GroupDirector } from '../../../models/business/group-director.model';
import { Groups } from '../../../models/parameters/groups.model';


@Component({
  selector: 'app-form-group-director',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,

    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextfield,
    TuiDataList,
    TuiHint,
    MatIconModule,

    TuiDataListWrapper,
  ],
  templateUrl: './form-group-director.component.html',
  styleUrl: './form-group-director.component.css'
})
export class FormGroupDirectorComponent implements OnInit, OnChanges {

  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  actionDescriptio!: string;

  @Input()
  model?: GroupDirector;

  @Output()
  posteoForm = new EventEmitter<CreateModelGroupDirector>();

  // Listas para los dropdowns
  groups: Groups[] = [];
  teachers: Teacher[] = [];

  private readonly formBuilder = inject(FormBuilder);
  private readonly groupsService = inject(GroupsService);
  private readonly teacherService = inject(TeacherService);

  form = this.formBuilder.nonNullable.group({
    groupsId: [0, { validators: [Validators.required, Validators.min(1)] }],
    teacherId: [0, { validators: [Validators.required, Validators.min(1)] }],
    status: [true],
  });

  ngOnInit(): void {
    this.cargarGroup();
    this.cargarTeacher();
  }

  ngOnChanges(): void {
    if (this.model) {
      let values = {
        groupsId: this.model.groupId,
        teacherId: this.model.teacherId,
        status: this.model.status == 1 ? true : false,
      }
      this.form.patchValue(values);
    }
  }

  // solucion de los select taiga

  // lista de la data a traer del la db
  groupList: Groups[] = [];
  groupListById = new Map(this.groupList.map(d => [d.id, d.name]));

  idToNameGroup = (v: number | string | null | undefined): string => {
    if (v == null) return '';
    const id = typeof v === 'string' ? Number(v) : v;
    return this.groupListById.get(id) ?? '';
  };

  cargarGroup(): void {
    this.groupsService.obtenerTodos().subscribe(data => {
      this.groupList = data;
      this.groupListById = new Map(this.groupList.map(d => [d.id, d.name]));
    });
  }


  // lista de la data a traer del la db
  teacherList: Teacher[] = [];
  teacherListById = new Map(this.teacherList.map(d => [d.id, d.fullName]));

  idToNameTeacher = (v: number | string | null | undefined): string => {
    if (v == null) return '';
    const id = typeof v === 'string' ? Number(v) : v;
    return this.teacherListById.get(id) ?? '';
  };

  cargarTeacher(): void {
    this.teacherService.obtenerTodos().subscribe(data => {
      this.teacherList = data;
      this.teacherListById = new Map(this.teacherList.map(d => [d.id, d.fullName]));
    });
  }
}
