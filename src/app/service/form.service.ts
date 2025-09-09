import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateModelForm, Form } from '../models/form.model';
import { ModelLogicalDelete } from '../global/model/logicalDelete.model';
import { GenericService } from './api/generic.service';

@Injectable({
  providedIn: 'root'
})

export class FormService extends GenericService<Form, CreateModelForm, ModelLogicalDelete> {
  constructor() { 
    super('Form')
  }
}
