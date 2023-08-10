import { Component, NgZone, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TableroService } from 'src/app/core/service/tablero.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { registroTablero } from './model/tablero';
import { TipoReporte } from './core/constant/Tableros';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { NotificationConstants } from './core/constant/notificationConstants';
import { SessionService } from './core/service/session.service';
import { SessionConstants } from './core/constant/SessionConstants';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  deviceInfo: any;

  isOffline: boolean = false;

  menuAccesibilidad: boolean = false;

  estadoBtnEspacio: {
    estado: number,
    value: string,
    isEstado: boolean,
    name: string
  } = {
      estado: 0,
      value: '',
      isEstado: false,
      name: ''
    }

  estadoBtnAltura: {
    estado: number,
    value: string,
    isEstado: boolean,
    name: string
  } = {
      estado: 0,
      value: '',
      isEstado: false,
      name: ''
    }

  estadoBtnAgrandar: {
    estado: number,
    value: string,
    isEstado: boolean,
    name: string
  } = {
      estado: 0,
      value: '',
      isEstado: false,
      name: ''
    }

  constructor(
    private swUpdate: SwUpdate,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private notificacionService: NotificacionService,
    private ngZone: NgZone,
    private translocoService: TranslocoService,
    private sessionService: SessionService) {
    let locale = this.sessionService.getItemInSession(SessionConstants.LOCALE);
    //console.log(navigator);
    if (locale === null) {
      if (navigator.language === 'en') {
        this.sessionService.setItemInSession(SessionConstants.LOCALE, 'en');
        this.translocoService.setActiveLang('en');
      } else {
        this.sessionService.setItemInSession(SessionConstants.LOCALE, 'es');
        this.translocoService.setActiveLang('es');
      }
    } else {
      this.translocoService.setActiveLang(locale);
    }
    if (swUpdate.isEnabled) {
      this.ngZone.runOutsideAngular(() =>
        setInterval(function () {
          swUpdate
            .checkForUpdate()
            .then(_ => console.log('SW Checking for updates'));
        }, 1000 * 10)
      );
    }
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // Comprueba si el navegador es compatible con PWA
    if ('BeforeInstallPromptEvent' in window) {
      //alert ('hola');
      // Escucha el evento 'beforeinstallprompt' hasta que la app sea instalada
      window.addEventListener('appinstalled', async (event) => {
        this.tablero(TipoReporte.INSTALACION);
        ////console.log('Aplicación instalada correctamente - Contructor');
      });
    }/* else {
      this.notificacionService.alert(
        'No compatible',
        'Tu navegador no es compatible con la instalación de la PWA Mi Movilidad'
      )
    }*/
  }

  manuAccesi() {
    if (this.menuAccesibilidad === false) {
      this.menuAccesibilidad = true;
    } else {
      this.menuAccesibilidad = false;
    }
  }

  agrandarText($event: any) {
    if (this.estadoBtnAgrandar.estado === 0) {
      this.estadoBtnAgrandar = {
        estado: 1,
        isEstado: true,
        value: 'agrandar-zoom-uno',
        name: '1.2'
      }
    } else if (this.estadoBtnAgrandar.estado === 1) {
      this.estadoBtnAgrandar = {
        estado: 2,
        isEstado: true,
        value: 'agrandar-zoom-dos',
        name: '1.3'
      }
    } else if (this.estadoBtnAgrandar.estado === 2) {
      this.estadoBtnAgrandar = {
        estado: 3,
        isEstado: true,
        value: 'agrandar-zoom-tres',
        name: '1.5'
      }
    } else if (this.estadoBtnAgrandar.estado === 3) {
      this.estadoBtnAgrandar = {
        estado: 4,
        value: 'agrandar-zoom-cuatro',
        isEstado: true,
        name: '1.6'
      }
    } else if (this.estadoBtnAgrandar.estado === 4) {
      this.estadoBtnAgrandar = {
        estado: 0,
        value: '',
        isEstado: false,
        name: ''
      }
    }
  }

  alturaText($event: any) {
    if (this.estadoBtnAltura.estado === 0) {
      this.estadoBtnAltura = {
        estado: 1,
        isEstado: true,
        value: 'line-height-uno',
        name: '2'
      }
    } else if (this.estadoBtnAltura.estado === 1) {
      this.estadoBtnAltura = {
        estado: 2,
        isEstado: true,
        value: 'line-height-dos',
        name: '2.5'
      }
    } else if (this.estadoBtnAltura.estado === 2) {
      this.estadoBtnAltura = {
        estado: 3,
        isEstado: true,
        value: 'line-height-tres',
        name: '3'
      }
    } else if (this.estadoBtnAltura.estado === 3) {
      this.estadoBtnAltura = {
        estado: 0,
        value: '',
        isEstado: false,
        name: ''
      }
    }
  }

  espacioText($event: any) {
    if (this.estadoBtnEspacio.estado === 0) {
      this.estadoBtnEspacio = {
        estado: 1,
        isEstado: true,
        value: 'letter-spacing-uno',
        name: '1.92px'
      }
    } else if (this.estadoBtnEspacio.estado === 1) {
      this.estadoBtnEspacio = {
        estado: 2,
        isEstado: true,
        value: 'letter-spacing-dos',
        name: '3.84px'
      }
    } else if (this.estadoBtnEspacio.estado === 2) {
      this.estadoBtnEspacio = {
        estado: 3,
        isEstado: true,
        value: 'letter-spacing-tres',
        name: '5.76px'
      }
    } else if (this.estadoBtnEspacio.estado === 3) {
      this.estadoBtnEspacio = {
        estado: 0,
        value: '',
        isEstado: false,
        name: ''
      }
    }
  }

  restablecer() {
    this.estadoBtnEspacio = {
      estado: 0,
      value: '',
      isEstado: false,
      name: ''
    }
    this.estadoBtnAltura = {
      estado: 0,
      value: '',
      isEstado: false,
      name: ''
    }
    this.estadoBtnAgrandar = {
      estado: 0,
      value: '',
      isEstado: false,
      name: ''
    }
  }

  tablero(name: string): void {
    let registro: registroTablero = {
      tipo: TipoReporte.INSTALACION,
      categoria: TipoReporte.INSTALACION,
      tipoTramite: TipoReporte.INSTALACION,
      tramite: name,
      dispositivo: this.deviceInfo.deviceType,
      navegador: this.deviceInfo.browser,
      so: this.deviceInfo.os
    }
    this.tableroService.registroTablero(registro).toPromise()
      .then(result => {
      })
      .catch(err => {
        console.error(err)
      })
  }

  //sepuedeInstall($event: any) {
  //  //console.log($event);
  //}

  //isInstalll($event: any) {
  ////console.log($event);
  //alert ('Aplicación instalada correctamente');
  //}

  online() {
    console.log("online");
    this.isOffline = false;
  }

  offline() {
    console.log('offline');
    this.isOffline = true;
    let locale = this.sessionService.getItemInSession(SessionConstants.LOCALE);
    if (locale === 'en') {
      this.notificacionService.custom(
        {
          type: 'custom',
          title: 'No internet connection',
          text: 'You are currently in offline mode. You do not have an internet connection and some options may be limited. Please reset your connection to access all features.',
          button: false,
          color: NotificationConstants.COLOR_INFO,
          icon: 'assets/icons/Icono_Modo Offline.svg',
          iconClass: "icon-offline-noty-size"
        }
      )
    } else {
      this.notificacionService.custom(
        {
          type: 'custom',
          title: 'Sin conexión a internet',
          text: 'Estás actualmente en modo offline. No tienes conexión a internet y algunas opciones pueden estar limitadas. Por favor, restablece tu conexión para acceder a todas las funciones.',
          button: false,
          color: NotificationConstants.COLOR_INFO,
          icon: 'assets/icons/Icono_Modo Offline.svg',
          iconClass: "icon-offline-noty-size"
        }
      )
    }
  }

  ngOnInit() {

    if (!(navigator.onLine)) {
      this.offline();
    }

    window.addEventListener('offline', async (event) => {
      this.offline();
    });

    window.addEventListener('online', async (event) => {
      this.online();
    });
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.notificacionService.custom(
          {
            type: 'custom',
            title: this.translocoService.translate('notificaciones.addNuevaVersion.title'),
            text: this.translocoService.translate('notificaciones.addNuevaVersion.text'),
            button: true,
            color: NotificationConstants.COLOR_INFO,
            icon: NotificationConstants.ICON_INFO
          }
        ).afterClosed().subscribe(result => {
          if (result) {
            window.location.reload();
          }
        });
      });
      this.swUpdate.activated.subscribe(() => {
        // Lógica para contar las instalaciones de la aplicación
        // //console.log('se instalo la aplicación')
      });
    }
  }

  title = 'miMovilidad';
}
