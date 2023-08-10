import { Component, HostListener } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilService } from '../../core/util/util.service';
import { PatternConstants } from "../../core/constant/PatternConstants";
import { Rol } from '../../core/constant/Rol';
import { persona } from 'src/app/model/persona';
import { PersonService } from 'src/app/core/service/person.service';
import { LoginService } from 'src/app/core/service/login.service';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/es';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { registroTablero } from 'src/app/model/tablero';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TableroService } from 'src/app/core/service/tablero.service';
import { environment } from 'src/environments/environment'
import { dataNoty } from 'src/app/model/noty';
import { NotificationConstants } from 'src/app/core/constant/notificationConstants';
import { SessionService } from 'src/app/core/service/session.service';
import { TranslocoService } from '@ngneat/transloco';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RegistroComponent {

  iconoVer: SafeHtml = "";
  iconoNoVer: SafeHtml = "";
  tipoDocumento: string="";
  documento: string="";
  confirmaDocumento: string="";
  fechaNacimiento: string="";
  fechaExpedicion: string="";
  primerNombre: string="";
  segundoNombre: string="";
  primerApellido: string="";
  segundoApellido: string="";
  sexo: string="";
  grupoSanguineo: string="";
  rhs: string="";
  celular: string="";
  confirmarCelular: string="";
  correo: string="";
  confirmarCorreo: string="";
  contrasena: string="";
  confirmarContrasena: string="";
  tratamientoDatos: string="";
  cuenta: string="";
  razonSocial: string = "";

  registerForm: FormGroup;

  environment: any = environment;

  deviceInfo: any;

  proceso: boolean = false;

  isNit: boolean = false;

  _validator: ValidatorFn = Validators.required

  linkLogo() {
    this.router.navigateByUrl('/pages/landing-page');
  }

  @HostListener('window:offline', ['$event'])
  onOfflineEvent(event: Event) {
    // Aquí puedes realizar la acción que desees cuando el usuario queda sin conexión
    this.sessionService.offlineRoot();
  }

  constructor(
    private fb: FormBuilder,
    private personaService: PersonService,
    private loginService: LoginService,
    private notificacionService: NotificacionService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private sessionService: SessionService,
    private translocoService: TranslocoService,
  ) {
    this.translocoService.selectTranslateObject('registro').subscribe(value => {
      this.tipoDocumento = value.tipoDocumento
      this.documento = value.documento
      this.confirmaDocumento = value.confirmaDocumento
      this.fechaNacimiento = value.fechaNacimiento
      this.fechaExpedicion = value.fechaExpedicion
      this.primerNombre = value.primerNombre
      this.segundoNombre = value.segundoNombre
      this.primerApellido = value.primerApellido
      this.segundoApellido = value.segundoApellido
      this.sexo = value.sexo
      this.rhs = value.rhs
      this.celular = value.celular
      this.confirmarCelular = value.confirmarCelular
      this.correo = value.correo
      this.confirmarCorreo = value.confirmarCorreo
      this.contrasena = value.contrasena
      this.confirmarContrasena = value.confirmarContrasena
      this.tratamientoDatos = value.tratamientoDatos
      this.cuenta = value.cuenta
      this.razonSocial = value.razonSocial
      this.grupoSanguineo = value.grupoSanguineo
    });
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.http.get("assets/icons/Ver contraseña_icono.svg", { responseType: 'text' })
      .subscribe(svg => {
        this.iconoVer = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
    this.http.get("assets/icons/No Ver contraseña_icono.svg", { responseType: 'text' })
      .subscribe(svg => {
        this.iconoNoVer = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
    this.registerForm = this.fb.group({
      nombre1: [null, [Validators.pattern(PatternConstants.PATTERN_TEXT)]],
      nombre2: [null, [Validators.pattern(PatternConstants.PATTERN_TEXT)]],
      apellido1: [null, [Validators.pattern(PatternConstants.PATTERN_TEXT)]],
      apellido2: [null, [Validators.pattern(PatternConstants.PATTERN_TEXT)]],
      razonSocial: [null],
      fechanacimiento: [null],
      fechaExpedicion: [null],
      sexo: [null],
      grupoSanguineo: [null],
      rh: [null],
      numeroIdentificacion: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(11), Validators.pattern(PatternConstants.PATTERN_TEXT_NUMB)]],
      numeroIdentificacion2: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(11), Validators.pattern(PatternConstants.PATTERN_TEXT_NUMB)]],
      idTipoIdentificacion: [null, [Validators.required]],
      nombreComercial: [null],
      idTipoUsuario: [Rol.CLIENTE, [Validators.required]],
      correoElectronico: [null, [Validators.required, Validators.pattern(PatternConstants.PATTERN_EMAIL)]],
      correoElectronico2: [null, [Validators.required, Validators.pattern(PatternConstants.PATTERN_EMAIL)]],
      telefonoMovil: [null, [Validators.pattern(PatternConstants.PATTERN_NUMBER_CELL_TEL), Validators.minLength(10), Validators.maxLength(10)]],
      telefonoMovil2: [null, [Validators.pattern(PatternConstants.PATTERN_NUMBER_CELL_TEL), Validators.minLength(10), Validators.maxLength(10)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(PatternConstants.PATTERN_PASSWORD)]],
      password2: [null, [Validators.required, Validators.minLength(8), Validators.pattern(PatternConstants.PATTERN_PASSWORD)]],
      check: [null, [Validators.requiredTrue]]
    },
      {
        validator: [
          UtilService.mustMatchCorreo('correoElectronico', 'correoElectronico2'),
          UtilService.mustMatchIdentificacion('numeroIdentificacion', 'numeroIdentificacion2'),
          UtilService.mustMatchTelf('telefonoMovil', 'telefonoMovil2'),
          UtilService.mustMatchContrasena('password', 'password2'),
          UtilService.tipoNumDocumento('idTipoIdentificacion', 'numeroIdentificacion'),
          UtilService.tipoNumDocumento('idTipoIdentificacion', 'numeroIdentificacion2'),
          UtilService.fechaFuturas('fechanacimiento'),
          UtilService.fechaFuturas('fechaExpedicion'),
        ]
      });
    ////console.log(this.registerForm.get("fechanacimiento")?.hasValidator(this._validator))
    this.onResize();
    this.listCatalogo = [
      { name: 'Cédula de ciudadanía', code: CatalogoTipoDocumento.CEDULA_CIUDADANIA },
      { name: 'Cédula de extranjería', code: CatalogoTipoDocumento.CEDULA_EXTRANJERIA },
      { name: 'Pasaporte', code: CatalogoTipoDocumento.PASAPORTE },
      { name: 'Registro Civil de Nacimiento', code: CatalogoTipoDocumento.REGISTRO_CIVIL },
      { name: 'NUIP', code: CatalogoTipoDocumento.NUIP },
      { name: 'Tarjeta de identidad', code: CatalogoTipoDocumento.TARJETA_IDENTIDAD },
      { name: 'NIT', code: CatalogoTipoDocumento.NIT },
      { name: 'Permiso por Protección Temporal', code: CatalogoTipoDocumento.PERMISO_PROTECCION_TEMPORAL }
    ];
    if (!(navigator.onLine)) {
      this.sessionService.offlineRoot();
    } else {
      this.catalogo("grupoSanguineo", this.listGrupoSanguineo);
      this.catalogo("rh", this.listRh);
      this.catalogo("categoriaGenero", this.listSexo);
      this.changeTipoNit()

      /*let datanoty: dataNoty = {
        type: NotificationConstants.CUSTOM,
        title: "Registro exitoso",
        text: "Ingresa a tu correo electrónico para validar el registro.",
        color: NotificationConstants.COLOR_SUCCESS,
        icon: "assets/icons/Registro exitoso_icono.svg",
        button: false
      }
      this.notificacionService.custom(datanoty).afterClosed().subscribe(result => {
        this.router.navigateByUrl('/signin');
      });*/
    }
  }

  registroTablero() {
    let registro: registroTablero = {
      tipo: TipoReporte.REGISTRO,
      categoria: TipoReporte.REGISTRO_TEXT,
      tipoTramite: TipoReporte.REGISTRO_TEXT,
      tramite: TipoReporte.REGISTRO_TEXT,
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

  maxLengthCheck(object: any, control: any) {
    if (object.value.length > object.maxLength) {
      object.value = object.value.slice(0, object.maxLength);
      control.setValue(object.value);
    }
  }

  changeTipoDocumento() {
    switch (this.registerForm.get('idTipoIdentificacion')?.value) {
      case CatalogoTipoDocumento.CEDULA_CIUDADANIA:
        return 'number'
        break;
      case CatalogoTipoDocumento.TARJETA_IDENTIDAD:
        return 'number'
        break;
      case CatalogoTipoDocumento.NIT:
        return 'number'
        break;
      default:
        return 'text'
        break;
    }
  }


  changeTipoNit() {
    if (this.registerForm.get('idTipoIdentificacion')?.value === '2') {
      this.isNit = true
      this.registerForm.get("razonSocial")?.addValidators(Validators.required)

      this.registerForm.get("nombre1")?.clearValidators()
      this.registerForm.get("apellido1")?.clearValidators()

      this.registerForm.get("fechanacimiento")?.clearValidators()
      this.registerForm.get("fechaExpedicion")?.clearValidators()
    } else {
      this.registerForm.get("razonSocial")?.clearValidators()
      this.isNit = false
      this.registerForm.get("nombre1")?.addValidators(Validators.required)
      this.registerForm.get("apellido1")?.addValidators(Validators.required)
      this.registerForm.get("fechanacimiento")?.addValidators(Validators.required)
      this.registerForm.get("fechaExpedicion")?.addValidators(Validators.required)
    }

    this.registerForm.get("fechanacimiento")?.setValue(null)
    this.registerForm.get("fechaExpedicion")?.setValue(null)
    this.registerForm.get("sexo")?.setValue(null)
    this.registerForm.get("grupoSanguineo")?.setValue(null)
    this.registerForm.get("rh")?.setValue(null)
    this.registerForm.get("razonSocial")?.setValue(null)
    this.registerForm.get("nombre1")?.setValue(null)
    this.registerForm.get("apellido1")?.setValue(null)
    this.registerForm.get("nombre2")?.setValue(null)
    this.registerForm.get("apellido2")?.setValue(null)
  }

  catalogo(name: string, list: any[]) {
    this.loginService.catalogo(name).toPromise()
      .then((result) => {
        let resul = result.body;
        resul.forEach((_data: any) => {
          let _index = {
            code: _data.id,
            name: _data.descripcion
          }
          list.push(_index);
        })
      })
      .catch(err => {
        this.notificacionService.error(
          "",
          "",
        );
      })
  }



  myFilter = (d: Date | null): boolean => {
    const day = (d !== null ? d : new Date())
    return (day <= new Date());
  };

  hasErrorDocumento(): void {
  }


  listCatalogo: any[] = [];

  listSexo: any[] = [];
  listGrupoSanguineo: any[] = [];
  listRh: any[] = [];

  breakpoint: number = 2;

  checked: boolean = false;

  hide1 = true;

  hide2 = true;

  styleCustom: string = "min-width: 530px !important;"

  onResize() {

    if (window.innerWidth <= 530) {
      this.breakpoint = 1;
      this.styleCustom = "";
    } else {
      this.breakpoint = 2;
      this.styleCustom = "min-width: 530px !important;"
    }

  }

  registrar() {
    this.proceso = true;
    let data: persona = {
      nombre1: this.registerForm.get('nombre1')?.value,
      nombre2: this.registerForm.get('nombre2')?.value,
      apellido1: this.registerForm.get('apellido1')?.value,
      apellido2: this.registerForm.get('apellido2')?.value,
      nombreComercial: this.registerForm.get('razonSocial')?.value,
      idTipoIdentificacion: this.registerForm.get('idTipoIdentificacion')?.value,
      numeroIdentificacion: this.registerForm.get('numeroIdentificacion')?.value,
      numeroIdentificacion2: this.registerForm.get('numeroIdentificacion2')?.value,
      correoElectronico: this.registerForm.get('correoElectronico')?.value,
      correoElectronico2: this.registerForm.get('correoElectronico2')?.value,
      idGenero: this.registerForm.get('sexo')?.value,
      idGrupoSanguineo: this.registerForm.get('grupoSanguineo')?.value,
      idRh: this.registerForm.get('rh')?.value,
      idTipoUsuario: this.registerForm.get('idTipoIdentificacion')?.value === '2' ? 8 : this.registerForm.get('idTipoUsuario')?.value,
      idCategoriaGenero: this.registerForm.get('sexo')?.value,
      fechaNacimiento: this.registerForm.get('idTipoIdentificacion')?.value === '2' ? null : moment(this.registerForm.get("fechanacimiento")?.value).format("YYYY-MM-DD"),
      fechaExpedicionDocumento: this.registerForm.get('idTipoIdentificacion')?.value === '2' ? null : moment(this.registerForm.get("fechaExpedicion")?.value).format("YYYY-MM-DD"),
      check: this.registerForm.get('check')?.value,
      password: this.registerForm.get('password')?.value,
      password2: this.registerForm.get('password2')?.value,
      telefonoMovil: this.registerForm.get('telefonoMovil')?.value,
      telefonoMovil2: this.registerForm.get('telefonoMovil2')?.value
    }

    this.loginService.register(PersonService.fixNames(data)).toPromise()
      .then((result) => {
        this.proceso = false;
        this.registroTablero();
        
        this.translocoService.selectTranslateObject('registro').subscribe(value => {
          let datanoty: dataNoty = {
            type: NotificationConstants.CUSTOM,
            title: value.registroExitoso,
            text: value.mensajeIngreso,
            color: NotificationConstants.COLOR_SUCCESS,
            icon: "assets/icons/Registro exitoso_icono.svg",
            button: false
          }
          this.notificacionService.custom(datanoty).afterClosed().subscribe(result => {
            this.router.navigateByUrl('/signin');
          });
        });


      })
      .catch(err => {
        //console.log(err);
        this.proceso = false;

        if (err.status === 500) {
          this.notificacionService.error(
            "",
            err.error
          );
        } else {
          this.notificacionService.error(
            "",
            ""
          );
        }
      })

  }


}
