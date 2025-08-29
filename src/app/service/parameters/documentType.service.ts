import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateModelDocumentType } from '../../models/DocumentType.model';
import { GenericService } from '../api/generic.service';
import { ModelLogicalDelete } from '../../global/model/logicalDelete.model';

@Injectable({
  providedIn: 'root'
})

export class DocumentTypeService extends GenericService<DocumentType, CreateModelDocumentType, ModelLogicalDelete> {
  constructor() { 
    super('DocumentType')
  }
}
