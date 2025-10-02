import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CredencialesUsuario, RespondAuth } from '../../global/dtos/seguridad';
import { Observable, tap, BehaviorSubject, firstValueFrom } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../user.service';

// Interface para el usuario decodificado del JWT
interface DecodedToken {
  id: number;
  email: string;
  personId?: number;
  rol?: string;
  exp: number;
  iat: number;
  [key: string]: any; // Para otros campos que pueda tener tu JWT
}

// Interface para el usuario actual
export interface CurrentUser {
  id: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthMainService {

  // **************** servicios ****************
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private userServices  = inject(UserService);

  // ***************** Claves para localStorage *****************
  private readonly llaveToken = 'toke';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly llaveRol = 'user-rol';
  private readonly llaveUsuario = 'current-user';


  // Metodo principal, da acceso a toda la plataforma, consulta al back si el usuario es aceptado
  login(credenciales: CredencialesUsuario): Observable<RespondAuth> {

    // enpoint al cual apunta para iniciar sesión
    return this.http.post<RespondAuth>(`${this.urlBase}/Auth`, credenciales)
      // efectos segundarios para guardar información y dar persistencia
      .pipe(
        tap(responseAuth => {
          try {

            // desencriptando informacion del claims de jwt backend
            const descodificado : CurrentUser = jwtDecode(responseAuth.token);
            let id = Number(descodificado.id);

            // obteniendo informacion del usuario quien se registra
            this.userServices.obtenerPorId(id).subscribe(
              {
                next:(data) => {
                  
                }
              }
            )

            console.log('Token decodificado:', descodificado);
            
            // ========================= Guardar token y datos del usuario =========================

            // ********** guardar el token localstorage **********
            this.guardaToken(responseAuth);

            // *********  **********
            this.guardarUsuarioActual(id);

          } catch (error) {
            console.error('Error decodificando token:', error);
          }
        })
      );
  }

  // ************** Guardar token en localStorage **************
  public guardaToken(authReponde: RespondAuth) {
    localStorage.setItem(this.llaveToken, authReponde.token);
    localStorage.setItem(this.llaveExpiracion, authReponde.expiracion.toString());
  }

  // Guardar datos del usuario actual
  private guardarUsuarioActual(idUser : number) {
    // guadando en el localstorage el id del usuario
    localStorage.setItem(this.llaveUsuario, idUser.toString());
  }

  // Verificar si está logueado
  estalogeado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    const expiracion = localStorage.getItem(this.llaveExpiracion);
    
    if (!token || !expiracion) {
      return false;
    }
    
    const expiracionFecha = new Date(expiracion);
    
    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }
    
    return true;
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveRol);
    localStorage.removeItem(this.llaveUsuario);
    
  }

  // Obtener token
  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }

  // Obtener rol
  obtenerIdUser(): number {
    return Number(localStorage.getItem(this.llaveUsuario));
  }

  async obtenerIdPerson(): Promise<number> {
    try {
      const data = await firstValueFrom(
        this.userServices.obtenerPorId(this.obtenerIdUser())
      );

      return data?.personId ?? 0;
      
    } catch (err) {
      console.error(err);
      return 0;
    }
  }


}