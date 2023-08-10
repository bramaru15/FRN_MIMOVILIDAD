import { Component, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilService } from '../../core/util/util.service';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { LoginService } from '../../core/service/login.service';
import { PatternConstants } from 'src/app/core/constant/PatternConstants';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { registroTablero } from 'src/app/model/tablero';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TableroService } from 'src/app/core/service/tablero.service';
import { dataNoty } from 'src/app/model/noty';
import { NotificationConstants } from 'src/app/core/constant/notificationConstants';
import { SessionService } from 'src/app/core/service/session.service';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.sass']
})
export class RecuperarContrasenaComponent {

  registerForm: FormGroup;

  listCatalogo: any[];

  deviceInfo: any;

  hide = true;

  styleCustom: string = "max-width: 525px !important;"

  proceso: boolean = false;

  @HostListener('window:offline', ['$event'])
  onOfflineEvent(event: Event) {
    // Aquí puedes realizar la acción que desees cuando el usuario queda sin conexión
    this.sessionService.offlineRoot();
  }

  constructor(
    private loginService: LoginService,
    private notificacionService: NotificacionService,
    private router: Router,
    private fb: FormBuilder,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private sessionService: SessionService,
    private translocoService: TranslocoService,
  ) {
    if (!(navigator.onLine)) {
      this.sessionService.offlineRoot();
    }
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.registerForm = this.fb.group({
      selectedTipoDocumento: [null, [Validators.required]],
      numDocumento: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(11), Validators.pattern(PatternConstants.PATTERN_TEXT_NUMB)]],
    },
      {
        validator: [UtilService.tipoNumDocumento('selectedTipoDocumento', 'numDocumento')]
      }
    );
    this.listCatalogo = [
      { name: 'Cédula de ciudadanía', code: CatalogoTipoDocumento.CEDULA_CIUDADANIA },
      { name: 'Cédula de extranjería', code: CatalogoTipoDocumento.CEDULA_EXTRANJERIA },
      { name: 'Pasaporte', code: CatalogoTipoDocumento.PASAPORTE },
      { name: 'Registro Civil de Nacimiento', code: CatalogoTipoDocumento.REGISTRO_CIVIL },
      { name: 'NUIP', code: CatalogoTipoDocumento.NUIP },
      { name: 'Tarjeta de identidad', code: CatalogoTipoDocumento.TARJETA_IDENTIDAD },
      { name: 'NIT', code: CatalogoTipoDocumento.NIT },
      { name: 'Permiso por Protección Temporal', code: CatalogoTipoDocumento.PERMISO_PROTECCION_TEMPORAL },
      { name: 'Funcionario', code: CatalogoTipoDocumento.FUNCIONARIO }
    ];
  }

  registroTablero() {
    let registro: registroTablero = {
      tipo: TipoReporte.RECUPERARCONTRASENA,
      categoria: TipoReporte.RECUPERARCONTRASENA_TEXT,
      tipoTramite: TipoReporte.RECUPERARCONTRASENA_TEXT,
      tramite: TipoReporte.RECUPERARCONTRASENA_TEXT,
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

  linkLogo() {
    this.router.navigateByUrl('/pages/landing-page');
  }


  recovery() {
    this.proceso = true;
    this.loginService.recovery(this.registerForm.get('numDocumento')?.value + "/" + this.registerForm.get('selectedTipoDocumento')?.value).toPromise()
      .then((result) => {
        this.proceso = false;
        this.registroTablero();

        /*this.notificacionService.success(
          "",
          "Correo enviado exitosamente."
        ).afterClosed().subscribe(result => {
          this.router.navigateByUrl('/signin');
        });*/

        let datanoty: dataNoty = {
          type: NotificationConstants.CUSTOM,
          title: this.translocoService.translate('notificaciones.recuperarContrasena.custom.title'),
          text: this.translocoService.translate('notificaciones.recuperarContrasena.custom.text'),
          color: NotificationConstants.COLOR_SUCCESS,
          icon: "assets/icons/Registro exitoso_icono.svg",
          button: false
        }
        this.notificacionService.custom(datanoty).afterClosed().subscribe(result => {
          this.router.navigateByUrl('/signin');
        });
      })
      .catch(err => {
        this.proceso = false;
        //console.log(err);
        if (err.status === 500) {
          this.notificacionService.error(
            "",
            err.error
          );
        } else {
          this.notificacionService.error(
            "",
            this.translocoService.translate('notificaciones.recuperarContrasena.error.text'),
          );
        }
      })
  }
}
