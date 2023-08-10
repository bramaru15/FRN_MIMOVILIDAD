import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { NotificationConstants } from 'src/app/core/constant/notificationConstants';
import { LoginService } from 'src/app/core/service/login.service';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { PersonService } from 'src/app/core/service/person.service';
import { SessionService } from 'src/app/core/service/session.service';
import { TableroService } from 'src/app/core/service/tablero.service';
import { buttonLink } from 'src/app/model/cardTramite';
import { dataNoty } from 'src/app/model/noty';
import { persona } from 'src/app/model/persona';
import { environment } from 'src/environments/environment';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
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
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
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
export class MiPerfilComponent {
  tipoPersona: boolean = false;
  listSexo: any[] = [];
  proceso: boolean = false;
  a: boolean = false;
  token: string = "";
  registerForm!: FormGroup;
  styleCustom: string = "width: 100% !important;"
  persona: persona;
  isConsulta: boolean = false;
  cardText: string = "";
  //_validator: ValidatorFn = Validators.required;
  tipoDocumento_fenix(tipo: string): string | null {
    switch (tipo) {
      case CatalogoTipoDocumento.CEDULA_CIUDADANIA:
        return CatalogoTipoDocumento.CEDULA_CIUDADANIA_TEXT
        break;
      case CatalogoTipoDocumento.CEDULA_EXTRANJERIA:
        return CatalogoTipoDocumento.CEDULA_EXTRANJERIA_TEXT
        break;
      case CatalogoTipoDocumento.NIT:
        return CatalogoTipoDocumento.NIT_TEXT
        break;
      case CatalogoTipoDocumento.NUIP:
        return CatalogoTipoDocumento.NUIP_TEXT
        break;
      case CatalogoTipoDocumento.PASAPORTE:
        return CatalogoTipoDocumento.PASAPORTE_TEXT
        break;
      case CatalogoTipoDocumento.REGISTRO_CIVIL:
        return CatalogoTipoDocumento.REGISTRO_CIVIL_TEXT
        break;
      case CatalogoTipoDocumento.PERMISO_PROTECCION_TEMPORAL:
        return CatalogoTipoDocumento.PERMISO_PROTECCION_TEMPORAL_TEXT
        break;
      case CatalogoTipoDocumento.TARJETA_IDENTIDAD:
        return CatalogoTipoDocumento.TARJETA_IDENTIDAD_TEXT
        break;
      default:
        return null
        break;
    }
  }

  constructor(private fb: FormBuilder,
    private notificacionService: NotificacionService, private router: Router,
    private sessionService: SessionService,
    private tableroService: TableroService,
    private translocoService: TranslocoService,
    private person: PersonService, private loginService: LoginService) {
    this.persona = this.sessionService.getItemObject(SessionConstants.PERSON);

    this.persona = PersonService.fixNames(this.persona)
    if (this.persona.idTipoIdentificacion == 2) {
      this.tipoPersona = true;
    }
    let genero: string = "";
    this.implement();

    this.registerForm = this.fb.group({
      tipoDocumento: [this.tipoDocumento_fenix(this.persona.idTipoIdentificacion + ""), [Validators.required]],
      numeroDocumento: [this.persona.numeroIdentificacion, [Validators.required]],
      nombre: [this.persona.fullName, [Validators.required]],
      primerNombre: [this.persona.nombre1],
      segundoNombre: [this.persona.nombre2],
      primerApellido: [this.persona.apellido1],
      segundoApellido: [this.persona.apellido2],
      sexo: this.fb.control(''),
      celular: [this.persona.telefonoMovil],
      fechaNacimiento: [new Date((this.persona.fechaNacimiento === null ? '' : this.persona.fechaNacimiento) + ' 00:00:00')],
      email: [this.persona.correoElectronico, [Validators.required]],
      razonSocial: [this.persona.nombreComercial]
    });
    console.log(this.persona)
    console.log(new Date(this.persona.fechaNacimiento === null ? '' : this.persona.fechaNacimiento))
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d !== null ? d : new Date())
    return (day <= new Date());
  };

  cerrarsession() {
    this.sessionService.notiCierreSession();
  }

  async implement() {
    await this.catalogo("categoriaGenero", this.listSexo)
    let genero: string = "";
    this.registerForm.get("sexo")?.setValue(this.listSexo.find(i => i.code == this.persona.idGenero).code.toString())

    this.registerForm.patchValue({
      sexo: this.listSexo.find(i => i.code == this.persona.idGenero).code // Valor que deseas asignar al select
    });

    //console.log(this.registerForm.getRawValue())
    //console.log(this.listSexo.find(i => i.code == 2))


  }

  async catalogo(name: string, list: any[]) {

    const result = await this.loginService.catalogo(name).toPromise()
    let resul = result.body;
    resul.forEach((_data: any) => {
      let _index = {
        code: _data.id,
        name: _data.descripcion
      }
      list.push(_index);
    })

    /*this.loginService.catalogo(name).toPromise()
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
        /*this.notificacionService.error(
          "",
          "",
        );
      })*/
  }

  actualizar() {

    this.persona.nombre2 = this.registerForm.get("segundoNombre")?.value;
    this.persona.nombre1 = this.registerForm.get("primerNombre")?.value;
    this.persona.apellido1 = this.registerForm.get("primerApellido")?.value;
    this.persona.apellido2 = this.registerForm.get("segundoApellido")?.value;
    this.persona.idGenero = this.registerForm.get("sexo")?.value;
    this.persona.telefonoMovil = this.registerForm.get("celular")?.value;
    this.persona.correoElectronico = this.registerForm.get("email")?.value;
    this.persona.fechaNacimiento = moment(this.registerForm.get("fechaNacimiento")?.value).format("YYYY-MM-DD").toString();


    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN) + '';

    this.person.actualizarPersona(this.persona, this.token).toPromise().then((result) => {
      console.log(result)
      this.translocoService.selectTranslateObject('miPerfil').subscribe(value => {

        this.loginService.authorization().toPromise()
          .then((_result) => {
            let respLogin = _result.body
            this.sessionService.setItemInSession(SessionConstants.TOKEN, respLogin.token);
            this.sessionService.setItemLocal(SessionConstants.TOKEN, respLogin.token);
            this.person.getPersonV2(this.token).toPromise()
              .then((__result) => {
                let person = __result.body;
                console.log(person)
                let nombre_usuario = [person.nombre1, person.apellido1, person.nombreComercial].filter(Boolean).join(' ');
                this.sessionService.setItem(SessionConstants.USER_NAME, nombre_usuario);
                this.sessionService.setItemObject(SessionConstants.PERSON, person);
                this.persona = this.sessionService.getItemObject(SessionConstants.PERSON);
                this.persona = PersonService.fixNames(this.persona)
                this.tableroService.registroTablerov2('tramite', 'Mi perfil', 'Actualización de datos', 'Actualizar').toPromise()
              })
          })
        let datanoty: dataNoty = {
          type: NotificationConstants.CUSTOM,
          title: value.procesoExitoso,
          text: value.actualizar,
          color: NotificationConstants.COLOR_SUCCESS,
          icon: "assets/icons/Registro exitoso_icono.svg",
          button: false
        }
        this.notificacionService.custom(datanoty).afterClosed().subscribe(result => {
          window.location.reload();
        });
      });
    }).catch(err => {
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
    });

    /*this.loginService.authorization().toPromise()
      .then((_result) => {
        let respLogin = _result.body
        this.sessionService.setItemInSession(SessionConstants.TOKEN, respLogin.token);
        this.sessionService.setItemLocal(SessionConstants.TOKEN, respLogin.token);
        this.person.getPersonV2(this.token).toPromise()
          .then((__result) => {
            let person = __result.body;
            //console.log(person)
            let nombre_usuario = [person.nombre1, person.apellido1, person.nombreComercial].filter(Boolean).join(' ');
            this.sessionService.setItem(SessionConstants.USER_NAME, nombre_usuario);
            this.sessionService.setItemObject(SessionConstants.PERSON, person);

            this.router.navigateByUrl('/pages/mi-perfil');
            setTimeout(() => {
              window.location.reload();
              //this.ngxSpinner.hide();
            }, 2000);
          })
      });*/
    console.log(this.registerForm.get("fechaNacimiento")?.value)
  }

  minString(text: string): string {
    return text.toLowerCase();
  }

}
