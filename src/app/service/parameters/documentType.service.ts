import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { CreateModelDocumentType, DocumentsType } from '../../models/DocumentType.model';
import { GenericService } from '../api/generic.service';
import { ModelLogicalDelete } from '../../global/model/logicalDelete.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentTypeService extends GenericService<DocumentsType, CreateModelDocumentType, ModelLogicalDelete> {
  constructor() { 
    super('DocumentType')
  }

  override obtenerTodos(status: number = 1): Observable<DocumentsType[]> {
    return this.http.get<DocumentsType[]>(`${this.urlBase}?status=${status}`);
  }
}
