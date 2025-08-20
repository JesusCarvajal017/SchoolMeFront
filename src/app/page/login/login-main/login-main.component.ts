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
    // TuiInputModule, 
    TuiIcon, 
    TuiPassword, 
    TuiTextfield,
    // TuiCardLarge,
    TuiError,
    MatProgressSpinnerModule,
    TuiRoot, 
    // RouterLink
  ],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.css'
})
export class LoginMainComponent  {
    private readonly alerts = inject(TuiAlertService);
 
    protected showNotification(): void {
      this.alerts
        .open('<strong>Acceso denegado</strong>', {label: 'Credenciales incorrectas!', appearance: 'warning'})
        .subscribe();
    }
  
  securityauth = inject(AuthMainService); 
  router = inject(Router);
  isLoader = false;



  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ["", {validators: [Validators.required, Validators.email]}],
    password : ["", {validators: [Validators.required]}]
  });

  obtenerErrorEmail(): string {
    let email = this.form.controls.email;

    if(email.hasError('required')){
      return "Digite el correo electronico";
    }

    return "";
  }

  obtenerErrorPassword(): string {
    let email = this.form.controls.password;

    if(email.hasError('required')){
      return "Digite la contraseña";
    }

    return "";
  }

  loguear(){
    this.isLoader = true; 
    let capture = this.form.getRawValue(); 

    const data : CredencialesUsuario = {
        email: capture.email!,
        password : capture.password!
    }

    // this.securityauth.logout();
    this.securityauth.login(data).subscribe({
      next: () =>{
        this.isLoader = false;
        this.router.navigate(['/dashboard'])
      },
      error: (err) =>{
        this.isLoader = false;
        this.showNotification();
        
        
      }
    })
  } 

  // redirect to Google login
  redirectToGoogle() {
    const clientId = '552894776373-rfu7g3c38orvbvvkl5bqblgsetg80vnc.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:4200/login';
    const scope = 'openid email profile';
    const secretToken = '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'; 
    const responseType = 'code';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = authUrl;
  }


}
