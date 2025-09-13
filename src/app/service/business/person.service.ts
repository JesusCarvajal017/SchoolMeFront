
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBasic, DataBasicQuery } from '../../models/security/dataBasic.model';
import { GenericService } from '../api/generic.service';

@Injectable({
  providedIn: 'root'
})

export class DataBasicService extends GenericService<DataBasic, DataBasicQuery, any[]> {
  constructor() { 
    super('DataBasic')
  }

  override obtenerTodos(status: number = 1): Observable<DataBasic[]> {
    return this.http.get<[]>(`${this.urlBase}?status=${status}`);
  }
}
