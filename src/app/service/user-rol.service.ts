import { Injectable } from '@angular/core';
import { GenericService } from './api/generic.service';
import { CreateModelUserRol, UserRol } from '../models/security/user-rol.model';
import { ModelLogicalDelete } from '../global/model/logicalDelete.model';

@Injectable({
  providedIn: 'root'
})
export class UserRolService extends GenericService<UserRol, CreateModelUserRol, ModelLogicalDelete> {
  constructor() { 
    super('UserRol')
  }
  
}
