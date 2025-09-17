import { inject, Injectable } from '@angular/core';

import { GenericService } from '../api/generic.service';
import { ModelLogicalDelete } from '../../global/model/logicalDelete.model';
import { Observable } from 'rxjs';
import { CreateMunicipality, Municipality } from '../../models/parameters/Municipality.model';


@Injectable({
  providedIn: 'root'
})

export class MunicipalityService extends GenericService<Municipality, CreateMunicipality, ModelLogicalDelete> {
  constructor() { 
    super('Municipality')
  }


  public MunicipiosDepart(id: any): Observable<Municipality[]> {
      return this.http.get<Municipality[]>(`${this.urlBase}/list/${id}`);
  }


}
