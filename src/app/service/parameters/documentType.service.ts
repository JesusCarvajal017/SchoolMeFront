import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { CreateModelDocumentType, DocumentsType } from '../../models/DocumentType.model';
import { GenericService } from '../api/generic.service';
import { ModelLogicalDelete } from '../../global/model/logicalDelete.model';

@Injectable({
  providedIn: 'root'
})

export class DocumentTypeService extends GenericService<DocumentsType, CreateModelDocumentType, ModelLogicalDelete> {
  constructor() { 
    super('DocumentType')
  }
}
