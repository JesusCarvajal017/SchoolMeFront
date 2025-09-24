import { Injectable } from '@angular/core';
import { GenericService } from './api/generic.service';
import { CreateModelUser, CreateModolUser2, User } from '../models/security/user.model';
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

  public createUserComplete(user: CreateModolUser2){
    const formData = this.construirFormData(user);
    return this.http.post(this.urlBase, formData);
  }


  private construirFormData(user: CreateModolUser2) : FormData{
    const formData = new FormData();

    formData.append('email', user.email )
    formData.append('password', user.password)
    
    // ojo con esto, 
    formData.append('personId', user.personId.toString());
    formData.append('status', user.status.toString())
    
    if(user.photo){
      formData.append('photo', user.photo ?? '');
    }


    return formData;
  }


}

export type { User };
