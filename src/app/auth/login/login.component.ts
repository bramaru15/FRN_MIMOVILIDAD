import { Component, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilService } from '../../core/util/util.service';
import { SessionService } from "../../core/service/session.service";
import { SessionConstants } from "../../core/constant/SessionConstants";
//import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LoginService } from "../../core/service/login.service";
import { Login } from "../../model/login";
import { Router } from "@angular/router";
import { Rol } from "../../core/constant/Rol";
import { GeneralConstants } from "../../core/constant/GeneralConstants";
import { PersonService } from '../../core/service/person.service'
import {
  CookieService
} from 'ngx-cookie-service';
import { NotificacionService } from '../../core/service/notificacion.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';



import { NotificacionComponent } from '../../component/notificacion/notificacion.component';
import { NotificationConstants } from '../../core/constant/notificationConstants';
import { MatDialog } from '@angular/material/dialog';
import { dataNoty } from '../../model/noty';
import { PatternConstants } from 'src/app/core/constant/PatternConstants';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { TableroService } from 'src/app/core/service/tablero.service';
import { registroTablero } from 'src/app/model/tablero';
import { TipoReporte } from 'src/app/core/constant/Tableros';

import { environment } from 'src/environments/environment'
import { persona } from "../../model/persona";
import { ParametroService } from 'src/app/core/service/parametro.service';
import { TranslocoService } from '@ngneat/transloco';

const eventDate = new Date('2023-03-15T14:30:00');

const eventEndDate = new Date('2023-03-15T16:00:00');

const eventDetails = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}
SUMMARY:Reunión de equipo
LOCATION:Oficina 123
DESCRIPTION:Reunión semanal del equipo de desarrollo
END:VEVENT
END:VCALENDAR`;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  environment: any = environment;

  registerForm: FormGroup;

  deviceInfo: any;

  iconoVer: SafeHtml = "";
  iconoNoVer: SafeHtml = "";
  isFun: boolean = false;

  @HostListener('window:offline', ['$event'])
  onOfflineEvent(event: Event) {
    // Aquí puedes realizar la acción que desees cuando el usuario queda sin conexión
    this.sessionService.offlineRoot();
  }


  constructor(
    private sessionService: SessionService,
    //private recaptchaV3Service: ReCaptchaV3Service,
    private loginService: LoginService,
    private router: Router,
    private personService: PersonService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificacionService: NotificacionService,
    private ngxSpinner: NgxSpinnerService,
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private parametroService: ParametroService,
    private translocoService: TranslocoService
  ) {
    if (!(navigator.onLine)) {
      this.sessionService.offlineRoot();
    }
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
      selectedTipoDocumento: [null, [Validators.required]],
      password: [null, [Validators.required]],
      usuario: [null],
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
    this.funcionarioChange();
  }

  ngOnInit() {
    this.sessionService.clearAll();
    if (this.sessionService.isSession()) {
      this.router.navigateByUrl('/pages/home');
    }
  }

  listCatalogo: any[];



  hide = true;

  ingresar() {

    this.requestScoreRecaptcha('');
    /*this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => {
        this.requestScoreRecaptcha(token);
      }, err => {
      });*/
  }

  linkLogo() {
    this.router.navigateByUrl('/pages/landing-page');
  }

  funcionarioChange() {
    if (this.registerForm.get('selectedTipoDocumento')?.value === '20') {
      this.isFun = true
      this.registerForm.get("numDocumento")?.removeValidators(Validators.required)
      this.registerForm.get("usuario")?.addValidators(Validators.required)
      this.registerForm.get("numDocumento")?.setValue(1)
    } else {
      this.isFun = false
      this.registerForm.get("usuario")?.clearValidators()
      this.registerForm.get("numDocumento")?.addValidators(Validators.required)
      this.registerForm.get("numDocumento")?.setValue(null)
    }

    this.registerForm.get("usuario")?.setValue(null)

  }

  requestScoreRecaptcha(token: string): void {
    this.ngxSpinner.show();
    this.authenticate();
    /*
    const request = {
      token,
    };
    this.loginService.validateRecaptchaToken(request).subscribe((res) => {
      this.authenticate();
    }, error => {
    });*/
  }

  registroTablero() {
    let registro: registroTablero = {
      tipo: TipoReporte.USUARIO,
      categoria: TipoReporte.USUARIO,
      tipoTramite: TipoReporte.USUARIO,
      tramite: TipoReporte.USUARIO,
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

  authenticate() {
    /*let logincmovil = {
      "usuario": "SDMUsuario",
      "password": "Secret@riaM0v1l1d@d"
    }
    this.loginService.loginCMovil(logincmovil).toPromise().then((tokenCmovil) => {
      ////console.log("TOKENS");
      let data = tokenCmovil;
      ////console.log(data);
      this.sessionService.setItemInSession(SessionConstants.TOKENCMOVIL,tokenCmovil);
      this.sessionService.setItemLocal(SessionConstants.TOKENCMOVIL, tokenCmovil);
    }).catch(errr =>  {
      //console.log(errr);
      this.sessionService.setItemInSession(SessionConstants.TOKENCMOVIL,errr.error.text);
      this.ngxSpinner.hide();
    });*/

    let login: Login = {
      username: '',
      password: ''
    }

    if (this.registerForm.get('selectedTipoDocumento')?.value !== '20') {
      login = {
        username: this.registerForm.get('numDocumento')?.value + "%" + this.registerForm.get('selectedTipoDocumento')?.value,
        password: this.registerForm.get('password')?.value
      }

      /*let logincmovil = {
        "usuario": "SDMUsuario",
        "password": "Secret@riaM0v1l1d@d"
      }
      this.loginService.loginCMovil(logincmovil).toPromise().then((tokenCmovil) => {
        //console.log(tokenCmovil);
        this.sessionService.setItemInSession(SessionConstants.TOKENCMOVIL,tokenCmovil);
      }).catch(errr => {
        //console.log(errr);
        this.ngxSpinner.hide();
      });*/




      this.loginService.login(login).toPromise()
        .then((result) => {
          this.loginService.authorization().toPromise()
            .then((_result) => {
              let respLogin = _result.body
              this.sessionService.setItemInSession(SessionConstants.TOKEN, respLogin.token);
              this.sessionService.setItemLocal(SessionConstants.TOKEN, respLogin.token);

              this.sessionService.setItem(SessionConstants.USER, login.username);
              this.sessionService.setItem(SessionConstants.EMAIL, respLogin.email);
              this.sessionService.setItemLocal(SessionConstants.EMAIL, respLogin.email);
              this.sessionService.setItem(SessionConstants.ROL, respLogin.scope.toString());
              const idRol: number = respLogin.scope;

              if (Rol.CLIENTE === idRol || (GeneralConstants.rolsRepresentante.includes(idRol.toString()))) {
                this.personService.getPersonV2(respLogin.token).toPromise()
                  .then((__result) => {
                    let person = __result.body;
                    let nombre_usuario = [person.nombre1, person.apellido1, person.nombreComercial].filter(Boolean).join(' ');
                    let nombre_usuario_corto = [person.nombre1, person.nombreComercial].filter(Boolean).join(' ');
                    this.sessionService.setItem(SessionConstants.USER_NAME, nombre_usuario);
                    this.sessionService.setItem(SessionConstants.USER_NAME_CORTO, nombre_usuario_corto);
                    this.sessionService.setItemObject(SessionConstants.PERSON, person);
                    this.registroTablero();
                    let loginSicon = {
                      "username": "datatools",
                      "password": "datatools2021*"
                    }
                    this.parametroService.parametro('direccionamiento', 'comparendos').toPromise().then(respuesta => {
                      this.parametroService.parametro('direccionamiento', 'inmovilizaciones').toPromise().then(respuestaIm => {
                        //console.log(respuestaIm);
                        this.sessionService.setItemLocal(SessionConstants.INMOVILIPARAMETRO, respuestaIm.length > 0 ? respuestaIm[0].proveedor === 'sicon' ? 'sicon' : 'fenix' : 'sinParametro');
                        this.sessionService.setItemLocal(SessionConstants.COMPARENDOPARAMETRO, respuesta.length > 0 ? respuesta[0].proveedor === 'sicon' ? 'sicon' : 'fenix' : 'sinParametro');
                        console.log(respuestaIm)
                        if (respuestaIm.length > 0) {
                          this.sessionService.setItemObject(SessionConstants.INMOVILIOBJETO, respuestaIm);
                        }
                        if (respuesta.length > 0) {
                          this.sessionService.setItemObject(SessionConstants.COMPARENDOOBJETO, respuesta);
                          if (respuesta[0].proveedor === 'sicon' || respuestaIm[0].proveedor === 'sicon') {
                            /*this.loginService.authSicon(loginSicon).toPromise().then((tokenSicon) => {
                              this.sessionService.setItemInSession(SessionConstants.TOKENSICON, tokenSicon.body.token);
                              this.router.navigateByUrl('/pages/home');
                              this.ngxSpinner.hide();
                            }).catch(errr => {
                              //console.log(errr);
                              this.router.navigateByUrl('/pages/home');
                              this.ngxSpinner.hide();
                            });*/
                            this.router.navigateByUrl('/pages/home');
                            this.ngxSpinner.hide();
                          } else {
                            this.router.navigateByUrl('/pages/home');
                            this.ngxSpinner.hide();
                          }
                        } else {
                          this.router.navigateByUrl('/pages/home');
                          this.ngxSpinner.hide();
                        }
                      })
                    }).catch((error) => {
                      this.sessionService.setItemLocal(SessionConstants.COMPARENDOPARAMETRO, 'sinParametro');
                      this.sessionService.setItemLocal(SessionConstants.INMOVILIPARAMETRO, 'sinParametro');
                      this.router.navigateByUrl('/pages/home');
                      this.ngxSpinner.hide();
                    })
                  })
                  .catch((errrr) => {
                    this.ngxSpinner.hide();
                    this.sessionService.clearAll();
                    this.router.navigateByUrl('/signin');
                    this.notificacionService.error(
                      "",
                      this.translocoService.translate('notificaciones.login.errorUno.text')
                    );
                  })
              } else {
                this.ngxSpinner.hide();
                this.notificacionService.error(
                  "",
                  this.translocoService.translate('notificaciones.login.errorDos.text')

                );
              }
            })
            .catch(errr => {
              //console.log(errr);
              this.ngxSpinner.hide();
              this.notificacionService.error(
                this.translocoService.translate('notificaciones.login.errorTres.title'),
                this.translocoService.translate('notificaciones.login.errorTres.text')
              );
            });
        })
        .catch(err => {
          //console.log(err);
          this.ngxSpinner.hide();
          this.notificacionService.error(
            this.translocoService.translate('notificaciones.login.errorTres.title'),
            this.translocoService.translate('notificaciones.login.errorTres.text')
          );
        });

    } else {
      login = {
        username: this.registerForm.get('usuario')?.value,
        password: this.registerForm.get('password')?.value
      }
      this.loginService.login(login).toPromise()
        .then((result) => {
          this.loginService.authorization().toPromise()
            .then((__result) => {
              //console.log(__result);
              this.ngxSpinner.hide();
              if (__result.body !== null && __result.body.scope === 40) {
                this.sessionService.setItem(SessionConstants.USER_NAME, __result.body.email);
                this.sessionService.setItemLocal(SessionConstants.EMAIL, __result.body.email);
                this.sessionService.setItem(SessionConstants.USER, __result.body.username);
                this.sessionService.setItem(SessionConstants.ROL, __result.body.scope.toString());
                this.sessionService.setItemInSession(SessionConstants.TOKEN, __result.body.token);
                this.sessionService.setItemLocal(SessionConstants.TOKEN, __result.body.token);
                let email: string = __result.body.email
                let indice = email.indexOf('@');
                this.sessionService.setItem(SessionConstants.USER_NAME_CORTO, email.substring(0, indice));
                this.router.navigateByUrl('/pagesf/home');
              } else {
                this.notificacionService.error(
                  this.translocoService.translate('notificaciones.login.errorTres.title'),
                  this.translocoService.translate('notificaciones.login.errorTres.text'),
                );
              }
            })
            .catch((err) => {
              //console.log(err);
              this.ngxSpinner.hide();
              this.notificacionService.error(
                this.translocoService.translate('notificaciones.login.errorTres.title'),
                this.translocoService.translate('notificaciones.login.errorTres.text'),
              );
            })
        })
        .catch((err) => {
          //console.log(err);
          this.ngxSpinner.hide();
          this.notificacionService.error(
            this.translocoService.translate('notificaciones.login.errorTres.title'),
            this.translocoService.translate('notificaciones.login.errorTres.text'),
          );
        })


    }

    /*
    let person: persona = {
      nombre1: "Anónimo",
      nombre2: "Anónimo",
      apellido1: "Anónimo",
      apellido2: "Anónimo",
      idTipoIdentificacion: null,
      numeroIdentificacion: null,
      numeroIdentificacion2: null,
      correoElectronico: null,
      correoElectronico2: null,
      idGenero: null,
      idGrupoSanguineo: null,
      idRh: null,
      idTipoUsuario: null,
      idCategoriaGenero: null,
      fechaNacimiento: null,
      fechaExpedicionDocumento: null,
      check: null,
      password: null,
      password2: null,
      telefonoMovil: null,
      telefonoMovil2: null,
      nombreComercial: null,
    }

    let nombre_usuario = "Anónimo";
    this.sessionService.setItem(SessionConstants.USER_NAME, nombre_usuario);
    this.sessionService.setItem(SessionConstants.USER, "Anónimo");
    this.sessionService.setItem(SessionConstants.ROL, "20");
    this.sessionService.setItemObject(SessionConstants.PERSON, person);
    this.registroTablero();
    if (this.registerForm.get('selectedTipoDocumento')?.value !== '20') {
      this.router.navigateByUrl('/pages/home');
    }
    else {
      this.router.navigateByUrl('/pagesf/home');
    }
    

    this.ngxSpinner.hide();
    */
  }

}
