import {inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export class GenericService<T, TCreate = T, TDeleteLogic = any> {

  protected http = inject(HttpClient);
  protected urlBase:string;

  constructor(endpoint: string) {
    this.urlBase = `${environment.apiUrl}/${endpoint}`;
  }

  public obtenerTodos(): Observable<T[]> {
    return this.http.get<T[]>(this.urlBase);
  }

  public obtenerPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.urlBase}/${id}`);
  }

  public crear(entity: TCreate): Observable<T> {
    return this.http.post<T>(this.urlBase, entity);
  }

  public actualizar(entity: T): Observable<T> {
    return this.http.put<T>(`${this.urlBase}/update`, entity);
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
  
  public eliminarLogico(id: number, data: any): Observable<void> {
    return this.http.patch<void>(`${this.urlBase}/logical/${id}`, data);
  }
}
