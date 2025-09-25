import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CredencialesUsuario, RespondAuth } from '../../global/dtos/seguridad';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";

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
  id: number;
  email: string;
  personId?: number;
  rol?: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthMainService {
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  
  // Subject para manejar el estado del usuario actual
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Claves para localStorage
  private readonly llaveToken = 'toke';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly llaveRol = 'user-rol';
  private readonly llaveUsuario = 'current-user';

  constructor() {
    // Cargar usuario desde localStorage al inicializar
    this.loadUserFromStorage();
  }

  // Método para login
  login(credenciales: CredencialesUsuario): Observable<RespondAuth> {
    return this.http.post<RespondAuth>(`${this.urlBase}/Auth`, credenciales)
      .pipe(
        tap(responseAuth => {
          try {
            const descodificado: DecodedToken = jwtDecode(responseAuth.token);
            
            console.log('Token decodificado:', descodificado);
            
            // Guardar token y datos del usuario
            this.guardaToken(responseAuth);
            this.guardarUsuarioActual(descodificado);
          } catch (error) {
            console.error('Error decodificando token:', error);
          }
        })
      );
  }

  // Guardar token en localStorage
  guardaToken(authReponde: RespondAuth) {
    localStorage.setItem(this.llaveToken, authReponde.token);
    localStorage.setItem(this.llaveExpiracion, authReponde.expiracion.toString());
  }

  // Guardar datos del usuario actual
  private guardarUsuarioActual(decodedToken: DecodedToken) {
    const currentUser: CurrentUser = {
      id: decodedToken.id,
      email: decodedToken.email,
      personId: decodedToken.personId,
      rol: decodedToken.rol
    };
    
    localStorage.setItem(this.llaveUsuario, JSON.stringify(currentUser));
    
    if (decodedToken.rol) {
      localStorage.setItem(this.llaveRol, decodedToken.rol);
    }
    
    // Actualizar el subject
    this.currentUserSubject.next(currentUser);
  }

  // Cargar usuario desde localStorage
  private loadUserFromStorage() {
    const token = localStorage.getItem(this.llaveToken);
    const userJson = localStorage.getItem(this.llaveUsuario);
    
    if (token && userJson && this.estalogeado()) {
      try {
        const user: CurrentUser = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    } else if (token && this.estalogeado()) {
      // Si no hay datos de usuario pero hay token válido, intentar decodificar
      this.refreshUserFromToken();
    }
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
    
    // Limpiar el subject
    this.currentUserSubject.next(null);
  }

  // Obtener token
  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }

  // Obtener rol
  obtenerRol(): string | null {
    return localStorage.getItem(this.llaveRol);
  }

  // Establecer rol del usuario
  setUserRole(rol: string) {
    localStorage.setItem(this.llaveRol, rol);
    
    // Actualizar también en el usuario actual
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.rol = rol;
      localStorage.setItem(this.llaveUsuario, JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);
    }
  }

  // Obtener usuario actual
  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  // Obtener ID del usuario actual
  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

  // Obtener PersonId del usuario actual
  getCurrentPersonId(): number | null {
    const user = this.getCurrentUser();
    return user?.personId || user?.id || null;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.estalogeado();
  }

  // Actualizar datos del usuario actual (útil después de cambios de perfil)
  updateCurrentUser(updatedData: Partial<CurrentUser>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedData };
      localStorage.setItem(this.llaveUsuario, JSON.stringify(newUser));
      this.currentUserSubject.next(newUser);
    }
  }

  // Petición al backend para obtener los roles del usuario
  getUserRoles(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/UserRol/RolesUsuario/${userId}`);
  }

  // Refrescar datos del usuario desde el token
  refreshUserFromToken(): void {
    const token = this.obtenerToken();
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        this.guardarUsuarioActual(decodedToken);
      } catch (error) {
        console.error('Error refreshing user from token:', error);
        this.logout();
      }
    }
  }
}