import { Injectable } from '@angular/core';
import { GenericService } from './api/generic.service';
import { CreateModelUser, User } from '../models/security/user.model';
import { ModelLogicalDelete } from '../global/model/logicalDelete.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User, CreateModelUser, ModelLogicalDelete> {
  constructor() { 
    super('User')
  }
     override obtenerTodos(status: number = 1): Observable<User[]> {
        return this.http.get<User[]>(`${this.urlBase}?status=${status}`);
  }
}

export type { User };
