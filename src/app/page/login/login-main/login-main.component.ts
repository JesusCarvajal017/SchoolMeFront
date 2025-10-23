import { Component, inject } from '@angular/core';

import {FormBuilder,  ReactiveFormsModule, Validators} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {TuiInputModule} from '@taiga-ui/legacy';

import {TuiIcon, TuiTextfield, TuiError, TuiAlertService} from '@taiga-ui/core';
import {TuiPassword} from '@taiga-ui/kit';
import {TuiCardLarge,} from '@taiga-ui/layout';
import { AuthMainService } from '../../../service/auth/auth-main.service';
import { Router, RouterLink } from '@angular/router';
import { CredencialesUsuario } from '../../../global/dtos/seguridad';
import {TuiRoot} from '@taiga-ui/core';



@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiIcon, 
    TuiPassword, 
    TuiTextfield,
    TuiError,
    MatProgressSpinnerModule,
    TuiRoot, 
  ],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.css'
})
export class LoginMainComponent  {
  private readonly alerts = inject(TuiAlertService);
  securityauth = inject(AuthMainService); 
  router = inject(Router);
  isLoader = false;

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ["", {validators: [Validators.required, Validators.email]}],
    password : ["", {validators: [Validators.required]}]
  });

  /**
   * Muestra una notificación de error cuando las credenciales son incorrectas
   */
  protected showNotification(): void {
    this.alerts
      .open('Las credenciales ingresadas son incorrectas. Por favor, verifica tu correo y contraseña.', {
        label: 'Acceso denegado',
        appearance: 'error',
        autoClose: 5000
      })
      .subscribe();
  }

  obtenerErrorEmail(): string {
    let email = this.form.controls.email;

    if(email.hasError('required')){
      return "Digite el correo electronico";
    }

    if(email.hasError('email')){
      return "Ingrese un correo electrónico válido";
    }

    return "";
  }

  obtenerErrorPassword(): string {
    let password = this.form.controls.password;

    if(password.hasError('required')){
      return "Digite la contraseña";
    }

    return "";
  }

  loguear(){
    // Validar el formulario antes de enviar
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.isLoader = true; 
    let capture = this.form.getRawValue(); 

    const data : CredencialesUsuario = {
        email: capture.email!,
        password : capture.password!
    }

    this.securityauth.login(data).subscribe({
      next: () => {
        this.isLoader = false;
        // Opcional: Mostrar mensaje de éxito
        this.alerts
          .open('Has iniciado sesión correctamente', {
            label: '¡Bienvenido!',
            appearance: 'success',
            autoClose: 3000
          })
          .subscribe();
        
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoader = false;
        console.error('Error en login:', err);
        this.showNotification();
      }
    });
  } 
}