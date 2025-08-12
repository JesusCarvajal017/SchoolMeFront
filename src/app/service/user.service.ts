import { Injectable } from '@angular/core';
import { GenericService } from './api/generic.service';
import { CreateModelUser, User } from '../models/user.model';
import { ModelLogicalDelete } from '../global/model/logicalDelete.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User, CreateModelUser, ModelLogicalDelete> {
  constructor() { 
    super('User')
  }
  
}
