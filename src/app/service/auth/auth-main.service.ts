import { HttpClient } from '@angular/common/http';
import { inject, Injectable, RESPONSE_INIT } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CredencialesUsuario, RespondAuth } from '../../global/dtos/seguridad';
import { Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthMainService {
  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;

  private readonly llaveToken = 'toke';
  private readonly llaveExpiracion = 'token-expiracion';

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
  }

  obtenerRol() : string {
    return 'admin'
  }

  obtenerToken() : string | null{
    return localStorage.getItem(this.llaveToken);
  }

}

