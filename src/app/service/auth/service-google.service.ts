import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceGoogleService {

  constructor() { }

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
