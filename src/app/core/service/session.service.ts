import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Login, Permisos, RespLogin } from '../../model/login';
import { SessionConstants } from "../constant/SessionConstants";
import {
  CookieService
} from 'ngx-cookie-service';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { NotificacionService } from './notificacion.service';
import { dataNoty } from 'src/app/model/noty';
import { NotificationConstants } from '../constant/notificationConstants';
import { Location } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private notificacionService: NotificacionService,
    private location: Location,
    private translocoService: TranslocoService
  ) {

  }

  clearAll() {
    //localStorage.clear();
    let num: number | undefined = this.getItemLocal('notificacion_Metodo') === null ? undefined : parseInt(this.getItemLocal('notificacion_Metodo') + '');
    clearInterval(num);
    sessionStorage.removeItem(SessionConstants.TOKEN);
    sessionStorage.removeItem(SessionConstants.TOKENSICON);
    //localStorage.removeItem(SessionConstants.EMAIL);
    this.cookieService.delete(SessionConstants.COOKIE);
    localStorage.clear();
  }

  notiCierreSession() {
    this.notificacionService.alert(this.translocoService.translate('notificaciones.cierreSession.v1.title'), 
    this.translocoService.translate('notificaciones.cierreSession.v1.text'), true).afterClosed().subscribe(result => {
        if (result) {
          this.clearAll()
          //window.location.href = '/#/pages/landing-page';
          window.location.reload();
        }
      });
  }

  offline() {
    this.notificacionService.custom(
      {
        type: 'custom',
        title: this.translocoService.translate('notificaciones.offline.v2.title'),
        text: this.translocoService.translate('notificaciones.offline.v2.text'),
        button: false,
        color: NotificationConstants.COLOR_INFO,
        icon: 'assets/icons/Icono_Modo Offline.svg',
        iconClass: "icon-offline-noty-size"
      }
    )
  }

  offlineRoot() {
    this.notificacionService.custom(
      {
        type: 'custom',
        title: this.translocoService.translate('notificaciones.offline.v2.title'),
        text: this.translocoService.translate('notificaciones.offline.v2.text'),
        button: false,
        color: NotificationConstants.COLOR_INFO,
        icon: 'assets/icons/Icono_Modo Offline.svg',
        iconClass: "icon-offline-noty-size"
      }
    ).afterClosed().subscribe(result => {
      this.clearAll()
      //window.location.href = '/#/pages/landing-page';
      //this.router.navigate(['/pages/landing-page'], { replaceUrl: true });
      this.location.back();
    });
  }

  offlineRootIsSession() {
    this.notificacionService.custom(
      {
        type: 'custom',
        title: this.translocoService.translate('notificaciones.offline.v3.title'),
        text: this.translocoService.translate('notificaciones.offline.v3.text'),
        button: false,
        color: NotificationConstants.COLOR_INFO,
        icon: 'assets/icons/Icono_Modo Offline.svg',
        iconClass: "icon-offline-noty-size"
      }
    ).afterClosed().subscribe(result => {
      this.clearAll()
      //window.location.href = '/#/pages/landing-page';
      window.location.reload();
    });
  }

  cerrarSession() {
    this.notificacionService.info(
      this.translocoService.translate('notificaciones.sesion.info.title'),
      this.translocoService.translate('notificaciones.sesion.info.text')
    ).afterClosed().subscribe(result => {
      this.clearAll()
      //window.location.href = '/#/pages/landing-page';
      //this.router.navigate(['/pages/landing-page'], { replaceUrl: true });
      window.location.reload();
    });

    //window.open('/pages/landing-page');
  }

  cerrarSessionError() {
    this.notificacionService.error(
      this.translocoService.translate('notificaciones.sesion.info.title'),
      this.translocoService.translate('notificaciones.sesion.error.title')
    ).afterClosed().subscribe(result => {
      this.clearAll()
      //window.location.href = '/#/pages/landing-page';
      //this.router.navigate(['/pages/landing-page'], { replaceUrl: true });
      window.location.reload();
    });

    //window.open('/pages/landing-page');
  }

  isSession(): boolean {
    if (this.getItemInSession(SessionConstants.TOKEN) !== null) {
      return true
    } else {
      return false
    }
  }

  getCookie(name: string): string | undefined {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  getItem(name: string): string | null {
    return localStorage.getItem(name);
  }

  getItemLocal(name: string): string | null {
    return localStorage.getItem(name);
  }

  setItem(name: string, value: any) {
    localStorage.setItem(name, value);
  }

  setItemLocal(name: string, value: any) {
    localStorage.setItem(name, value);
  }

  getItemInSession(name: string): string | null {
    return sessionStorage.getItem(name);
  }

  setItemInSession(name: string, value: any) {
    sessionStorage.setItem(name, value)
  }

  getItemObject(name: string): any {
    if (localStorage.getItem(name)) {
      return JSON.parse(atob(localStorage.getItem(name) + ""));
    }
  }

  setItemObject(name: string, value: any) {
    localStorage.setItem(name, btoa(JSON.stringify(value)));
  }

  deleteItem(name: string) {
    localStorage.removeItem(name);
  }

  deleteItemLocal(name: string) {
    localStorage.removeItem(name);
  }
}
