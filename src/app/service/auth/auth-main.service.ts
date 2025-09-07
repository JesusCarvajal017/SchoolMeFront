import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CredencialesUsuario, RespondAuth } from '../../global/dtos/seguridad';
import { Observable, tap } from 'rxjs';

import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthMainService {
  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private UserRol !: number;

  private readonly llaveToken = 'toke';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly llaveRol = 'user-rol';

  // metodo post para la autentificacion
  login(credenciales : CredencialesUsuario) : Observable<RespondAuth>{
    return this.http.post<RespondAuth>(`${this.urlBase}/Auth`, credenciales)
    .pipe(
      // tap(()=> console.log("hola")),
      tap(responseAuth => {
        let descodificado :  any[] = jwtDecode(responseAuth.token);
        
        // this.UserRol = descodificado.id;
        console.log(descodificado);

        //guardamos el token en el localstorage
        this.guardaToken(responseAuth);


        




      })
    )
  }

  guardaToken(authReponde : RespondAuth){
    localStorage.setItem(this.llaveToken, authReponde.token);
    localStorage.setItem(this.llaveExpiracion, authReponde.expiracion.toString());
    // localStorage.setItem(this.llaveRol)
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
    return this.http.get<string[]>(`${this.urlBase}/UserRol/RolesUsuario/${userId}`);
  }
}

