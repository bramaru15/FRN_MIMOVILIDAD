import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { PatternConstants } from 'src/app/core/constant/PatternConstants';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { FirmaElectronicaService } from 'src/app/core/service/firma-electronica.service';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { PersonService } from 'src/app/core/service/person.service';
import { SessionService } from 'src/app/core/service/session.service';
import { UtilService } from 'src/app/core/util/util.service';
import { buttonLink } from 'src/app/model/cardTramite';
import { persona } from 'src/app/model/persona';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { dataNoty } from 'src/app/model/noty';
import { NotificationConstants } from 'src/app/core/constant/notificationConstants';
import { TableroService } from 'src/app/core/service/tablero.service';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-firma-electronica',
  templateUrl: './firma-electronica.component.html',
  styleUrls: ['./firma-electronica.component.scss']
})
export class FirmaElectronicaComponent {
  proceso: boolean = true;
  mensajeValidacionFirma:string="";
  persona: persona

  hide1 = true;
  hide2 = true;

  isFirmaConsulta: boolean = false;
  isFechaExpiracion: boolean = false;
  iconoVer: SafeHtml = "";
  iconoNoVer: SafeHtml = "";
  fechaExpiracion: string = "";
  registerForm: FormGroup;
  registerFormTwo: FormGroup;
  isConsulta: boolean = false;
  cardText: string = "";
  cardText2: string = "";
  cardText3: string = "";
  styleCustom: string = "width: 100% !important;"
  listButton: buttonLink[] = []


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

  tipoDocumento_fenix_code(tipo: string): string | null {
    switch (tipo) {
      case CatalogoTipoDocumento.CEDULA_CIUDADANIA_TEXT:
        return 'CC'
        break;
      case CatalogoTipoDocumento.CEDULA_EXTRANJERIA_TEXT:
        return 'CE'
        break;
      case CatalogoTipoDocumento.NIT_TEXT:
        return 'NIT'
        break;
      case CatalogoTipoDocumento.NUIP_TEXT:
        return 'NUIP'
        break;
      case CatalogoTipoDocumento.PASAPORTE_TEXT:
        return 'P'
        break;
      case CatalogoTipoDocumento.REGISTRO_CIVIL_TEXT:
        return 'RC'
        break;
      case CatalogoTipoDocumento.PERMISO_PROTECCION_TEMPORAL_TEXT:
        return 'PPT'
        break;
      case CatalogoTipoDocumento.TARJETA_IDENTIDAD_TEXT:
        return 'TI'
        break;
      default:
        return null
        break;
    }
  }

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private firmaElectronicaService: FirmaElectronicaService,
    private notificacionService: NotificacionService,
    private router: Router,
    private tableroService: TableroService,
    private translocoService: TranslocoService
  ) {
    this.translocoService.selectTranslateObject('firmaElectronica').subscribe(value => {
      this.cardText = value.cardText
      this.cardText2 = value.cardText2
      this.cardText3 = value.cardText3
      this.listButton = [
        {
          name: value.actualizacionDatos,
          link: '/pages/mi-perfil',
          linkIcon: "assets/icons/Actualización de datos_icono.svg",
          linkVus:false,
          direciona: false
        }/*,
        {
          name: value.activarFirmaElectronica,
          link: environment.direccionamiento.firmaElectronica.comoactivarFirma,
          linkIcon: "assets/icons/Como_agendar_cita_icono-01.svg",
          linkVus:false,
          direciona: true,
          categoria: "Firma electrónica",
          tipo_tramite: "Otras opciones",
        },*/
      ]


    });

    this.persona = this.sessionService.getItemObject(SessionConstants.PERSON);
    ////console.log(this.persona);
    this.persona = PersonService.fixNames(this.persona)
    //this.persona.numeroIdentificacion = "12345678";
    //this.persona.correoElectronico = "asdasd@sdasd.com"
    //console.log("persona")
    //console.log(this.persona)
    this.http.get("assets/icons/Ver contraseña_icono.svg", { responseType: 'text' })
      .subscribe(svg => {
        this.iconoVer = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
    this.http.get("assets/icons/No Ver contraseña_icono.svg", { responseType: 'text' })
      .subscribe(svg => {
        this.iconoNoVer = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
      this.translocoService.selectTranslateObject('firmaElectronica').subscribe(value => {
        this.firmaElectronicaService.getSignature(this.tipoDocumento_fenix_code(this.tipoDocumento_fenix(this.persona.idTipoIdentificacion+"")+"") + "-" + this.persona.numeroIdentificacion).toPromise()
        .then((result) => {
          const body = result.body;
  
          //console.log("RESULTADO");
  
  
          //console.log(body);
          let fechaActual = new Date();
          if (new Date(body.expirationDate) > fechaActual) {
            //console.log("BIEN");
            this.isFechaExpiracion = true;
            
            this.fechaExpiracion = moment(body.expirationDate).format("YYYY-MM-DD");
            this.mensajeValidacionFirma=value.mensajeFirma+' '+this.fechaExpiracion;
          }
  
          this.proceso = false;
  
        })
        .catch((err) => {
          //console.log(err)
          if (err.status === 400) {
            this.isFirmaConsulta = true;
            this.proceso = false;
          } else {
            this.notificacionService.error(
              this.translocoService.translate('notificaciones.firmaElectronica.error'),
               value.error
            ).afterClosed().subscribe(result => {
              this.isFirmaConsulta = true;
              this.proceso = false;
            });
          }
        })
      
      });
    
    this.registerForm = this.fb.group({
      tipoDocumento: [this.tipoDocumento_fenix(this.persona.idTipoIdentificacion+""), [Validators.required]],
      numeroDocumento: [this.persona.numeroIdentificacion, [Validators.required]],
      nombre: [this.persona.fullName, [Validators.required]],
      email: [this.persona.correoElectronico, [Validators.required]],
    });
    this.registerFormTwo = this.fb.group({
      contrasena: [null, [Validators.required, Validators.minLength(10), Validators.pattern(PatternConstants.PATTERN_PASSWORD)]],
      confirmarContrasena: [null, [Validators.required, Validators.minLength(10), Validators.pattern(PatternConstants.PATTERN_PASSWORD)]],
      isAcuerdo: [null, [Validators.requiredTrue]],
    },
      {
        validator: [
          UtilService.mustMatchContrasena('contrasena', 'confirmarContrasena')
        ]
      });
  }

  consultar() {
    this.isConsulta = true;
    let user = this.tipoDocumento_fenix_code(this.registerForm.get("tipoDocumento")?.value) + "-" + this.registerForm.get("numeroDocumento")?.value;
    let contrasena = this.registerFormTwo.get("contrasena")?.value;
    this.translocoService.selectTranslateObject('firmaElectronica').subscribe(value => {

      this.firmaElectronicaService.createSignature(contrasena, user).toPromise()
      .then((result: any) => {
        //console.log(result);
        if (result.body.errType === null) {
          let fechaF = new Date(result.body.expirationDate);
          /*this.notificacionService.success(
            "Proceso exitoso",
            "Se creo la firma electrónica correctamente y expira el " + fechaF.toLocaleDateString() + " " + fechaF.toLocaleTimeString()
          ).afterClosed().subscribe(result => {
            this.router.navigateByUrl('/pages/home');
          });*/

          this.tableroService.registroTablerov2('firma_electronica','Mi perfil','Firma electrónica','Generar firma electrónica').toPromise();

          let datanoty: dataNoty = {
            type: NotificationConstants.CUSTOM,
            title: value.procesoExitoso,
            text: value.text +' '+ moment(fechaF).format("YYYY-MM-DD") + " " + fechaF.toLocaleTimeString()+".",
            color: NotificationConstants.COLOR_SUCCESS,
            icon: "assets/icons/Registro exitoso_icono.svg",
            button: false
          }
          this.notificacionService.custom(datanoty).afterClosed().subscribe(result => {
            this.router.navigateByUrl('/pages/home');
          });

        } else {
          this.isConsulta = false;
          this.notificacionService.error(
            this.translocoService.translate('notificaciones.firmaElectronica.error'),
            value.error2
          )
        }
      })
      .catch((err) => {
        //console.log(err);
        this.isConsulta = false;
        this.notificacionService.error(
          this.translocoService.translate('notificaciones.firmaElectronica.error'),
          value.error2
        )
      })
    });


  }

  isAcuerdo(that: any) {
    if (that.value === 'si') {
      this.registerFormTwo.get("isAcuerdo")?.setValue(that.checked)
    } else {
      this.registerFormTwo.get("isAcuerdo")?.setValue(false)
    }
  }
}
