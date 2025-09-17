import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateModelDocumentType, DocumentType } from '../../models/DocumentType.model';
import { GenericService } from '../api/generic.service';
import { ModelLogicalDelete } from '../../global/model/logicalDelete.model';

@Injectable({
  providedIn: 'root'
})

export class DocumentTypeService extends GenericService<DocumentType, CreateModelDocumentType, ModelLogicalDelete> {
  constructor() { 
    super('DocumentType')
  }

       override obtenerTodos(status: number = 1): Observable<DocumentType[]> {
        return this.http.get<DocumentType[]>(`${this.urlBase}?status=${status}`);
  }
}
