import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateModelPerson, Person, PersonComplete, PersonOrigin } from '../models/security/person.model';
import { ModelLogicalDelete } from '../global/model/logicalDelete.model';
import { GenericService } from './api/generic.service';

@Injectable({
  providedIn: 'root'
})

export class PersonService extends GenericService<PersonOrigin, CreateModelPerson, ModelLogicalDelete> {
  constructor() { 
    super('Person')
  }

  obtenerTodosOrigin(status: number = 1): Observable<PersonOrigin[]> {
    return this.http.get<PersonOrigin[]>(`${this.urlBase}?status=${status}`);
  }

  crearComplete(entity: CreateModelPerson): Observable<CreateModelPerson> {
    return this.http.post<CreateModelPerson>(`${this.urlBase}/CreateComplet` , entity);
  }
  
  actulizarComplete(id : number,entity: CreateModelPerson): Observable<CreateModelPerson> {
    return this.http.put<CreateModelPerson>(`${this.urlBase}/UpdateComplete/${id}` , entity);
  }
  
  public ObtenerComplete(id: number): Observable<PersonComplete> {
    return this.http.get<PersonComplete>(`${this.urlBase}/PersonBasic/${id}`);
  }


}
