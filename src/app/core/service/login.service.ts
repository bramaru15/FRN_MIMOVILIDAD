import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Login, Permisos, RecaptchaResponseBody, ResetPassword, RespLogin } from '../../model/login';
import { persona } from "../../model/persona";
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  constructor(private http: HttpClient, private sessionService: SessionService, private router: Router) { }
  canActivate(): boolean {

    if (!(navigator.onLine)) {
      if (this.sessionService.isSession()) {
        this.sessionService.offlineRootIsSession();
      }
    }
    window.addEventListener('offline', async (event) => {
      if (this.sessionService.isSession()) {
        this.sessionService.offlineRootIsSession();
      }
    });

    if (this.sessionService.isSession()) {
      return true;
    } else {
      //this.router.navigateByUrl('/signin');
      this.router.navigate(['/pages/landing-page'], { replaceUrl: true });
      //window.location.reload();
      return false;
    }
  }

  catalogo(name: string): Observable<any> {
    return this.http.get(environment.catalogo + name,
      {
        withCredentials: true,
        observe: 'response',
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  login(login: Login): Observable<any> {
    let body = new URLSearchParams();
    body.set('username', login.username);
    body.set('password', login.password);
    return this.http.post(environment.login, body,
      {
        withCredentials: true,
        observe: "response",
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  authorization(): Observable<any> {
    return this.http.get(environment.autorizacion,
      {
        withCredentials: true,
        observe: 'response',
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  recovery(data: string): Observable<any> {
    return this.http.get(environment.resetPassword + data,
      {
        withCredentials: true,
        observe: 'response',
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  register(persona: persona): Observable<any> {
    return this.http.post(environment.registro, persona,
      {
        withCredentials: true,
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  validateRecaptchaToken(token: any): Observable<any> {
    return this.http.post(environment.recaptcha.v3.siteVerify, token,
      {
        withCredentials: true,
        observe: 'response',
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  loginCMovil(login: any) {
    return this.http.post(environment.loginCmovil, login, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.keyApiManager
      }
    })
  }

  authSicon(login: any): Observable<any> {
    let params = JSON.stringify(login);
    return this.http.post(environment.authSicon, params,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }
}