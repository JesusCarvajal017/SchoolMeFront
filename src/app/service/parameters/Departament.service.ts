
import { inject, Injectable } from '@angular/core';

import { GenericService } from '../api/generic.service';
import { ModelLogicalDelete } from '../../global/model/logicalDelete.model';
import { CreateDepartament, Departament } from '../../models/parameters/Departament.model';

@Injectable({
  providedIn: 'root'
})

export class DepartamentServices extends GenericService<Departament, CreateDepartament, ModelLogicalDelete> {
  constructor() { 
    super('Departament');
  }
}