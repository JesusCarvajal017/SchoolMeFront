import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CredencialesUsuario, RespondAuth } from '../../global/dtos/seguridad';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthMainService {
  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;

  private readonly llaveToken = 'toke';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly llaveRol = 'user-rol';

  login(credenciales : CredencialesUsuario) : Observable<RespondAuth>{
    return this.http.post<RespondAuth>(`${this.urlBase}/Auth`, credenciales)
    .pipe(
      tap(responseAuth => this.guardaToken(responseAuth))
    )
  }

  guardaToken(authReponde : RespondAuth){
    localStorage.setItem(this.llaveToken, authReponde.token);
    localStorage.setItem(this.llaveExpiracion, authReponde.expiracion.toString());
  }

  estalogeado() : boolean{
    const token = localStorage.getItem(this.llaveToken);
    const expiracion = localStorage.getItem(this.llaveExpiracion)!;
    const expiracionFecha = new Date(expiracion);
    
    if(!token){
      return false;
    }

    if(expiracionFecha <= new Date()){
      this.logout();
      return false;
    }

    return true;
  }

  logout(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveRol);
  }

  obtenerRol() : string | null {
    return localStorage.getItem(this.llaveRol);
  }

  setUserRole(rol: string) {
    localStorage.setItem(this.llaveRol, rol);
  }

  obtenerToken() : string | null{
    return localStorage.getItem(this.llaveToken);
  }

  // Petición al backend para obtener los roles del usuario
  getUserRoles(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/Auth/roles/${userId}`);
  }
}