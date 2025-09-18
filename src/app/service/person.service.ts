import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateModelPerson, Person } from '../models/security/person.model';
import { ModelLogicalDelete } from '../global/model/logicalDelete.model';
import { GenericService } from './api/generic.service';

@Injectable({
  providedIn: 'root'
})

export class PersonService extends GenericService<Person, CreateModelPerson, ModelLogicalDelete> {
  constructor() { 
    super('Person')
  }

  override obtenerTodos(status: number = 1): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.urlBase}?status=${status}`);
  }
}
