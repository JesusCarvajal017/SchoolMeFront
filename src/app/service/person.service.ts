// src/app/services/persona.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Persona {
  id: number;
  tipoId: string;
  numeroId: string;
  nombres: string;
  genero: string;
  telefono: string;
  correo: string;
}

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private apiUrl = '/Person';

  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  updatePersona(id: number, persona: Persona): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, persona);
  }

  deletePersona(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
