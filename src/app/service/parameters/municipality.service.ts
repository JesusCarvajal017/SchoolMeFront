import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateModelMunicipality, Municipality } from '../../models/municipality.model';
import { ModelLogicalDelete } from '../../global/model/logicalDelete.model';
import { GenericService } from '../api/generic.service';

@Injectable({
  providedIn: 'root'
})

export class MunicipalityService extends GenericService<Municipality, CreateModelMunicipality, ModelLogicalDelete> {
  constructor() { 
    super('Municipality')
  }

     override obtenerTodos(status: number = 1): Observable<Municipality[]> {
      return this.http.get<Municipality[]>(`${this.urlBase}?status=${status}`);
}
}
