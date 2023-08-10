import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HomeService } from 'src/app/core/service/home.service';
import { buttonLink, dataCardTramite, listSubTramites } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { SessionService } from 'src/app/core/service/session.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LoginService } from 'src/app/core/service/login.service';

@Component({
  selector: 'app-comparendos',
  templateUrl: './comparendos.component.html',
  styleUrls: ['./comparendos.component.sass']
})
export class ComparendosComponent implements OnInit {

  formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })


  proceso: boolean = true;

  personAny: any

  listaComparendos: any[] = [];
  cardText = "";

  dataCardTramite: dataCardTramite = {
    linkIcon: "",
    title: "",
    textButton: "",
    linkButtonMas: "",
    linkButtonUno: "",
    listaButtonCardTramite: [
      {
        type: 'fecha',
        name: "",
        estadoButton: false,
        text: ""
      }
    ]
  }

  listButton: buttonLink[] = [];

  constructor(
    private parametroService: ParametroService,
    private notificacionService: NotificacionService,
    private router: Router,
    private homeService: HomeService, private translocoService: TranslocoService,
    private sessionService: SessionService,
    private loginService: LoginService

  ) {
    /*this.translocoService.selectTranslateObject('comparendos').subscribe(value => {
      this.cardText = value.cardText
    })*/
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);////console.log
    }
    catch (Error) {
      //this.sessionService.cerrarSession();
      console.error('Error decode: ', Error)
      return null;
    }
  }

  tipoDocumento_sicon(tipo: string): string {
    switch (tipo) {
      case CatalogoTipoDocumento.CEDULA_CIUDADANIA:
        return '1'
        break;
      case CatalogoTipoDocumento.CEDULA_EXTRANJERIA:
        return '3'
        break;
      case CatalogoTipoDocumento.NIT:
        return '2'
        break;
      case CatalogoTipoDocumento.NUIP:
        return '1'
        break;
      case CatalogoTipoDocumento.PASAPORTE:
        return '5'
        break;
      case CatalogoTipoDocumento.REGISTRO_CIVIL:
        return '6'
        break;
      case CatalogoTipoDocumento.PERMISO_PROTECCION_TEMPORAL:
        return '13'
        break;
      case CatalogoTipoDocumento.TARJETA_IDENTIDAD:
        return '4'
        break;
      default:
        return '1'
        break;
    }
  }

  tipoDocumento_fenix(tipo: string): string {
    switch (tipo) {
      case CatalogoTipoDocumento.CEDULA_CIUDADANIA:
        return 'C'
        break;
      case CatalogoTipoDocumento.CEDULA_EXTRANJERIA:
        return 'E'
        break;
      case CatalogoTipoDocumento.NIT:
        return 'N'
        break;
      case CatalogoTipoDocumento.NUIP:
        return 'C'
        break;
      case CatalogoTipoDocumento.PASAPORTE:
        return 'P'
        break;
      case CatalogoTipoDocumento.REGISTRO_CIVIL:
        return 'U'
        break;
      case CatalogoTipoDocumento.PERMISO_PROTECCION_TEMPORAL:
        return 'C'
        break;
      case CatalogoTipoDocumento.TARJETA_IDENTIDAD:
        return 'T'
        break;
      default:
        return 'C'
        break;
    }
  }

  ngOnInit(): void {
    this.personAny = this.sessionService.getItemObject(SessionConstants.PERSON);
    let token = this.sessionService.getItemInSession(SessionConstants.TOKENSICON);
    let parametro = this.sessionService.getItemLocal(SessionConstants.COMPARENDOPARAMETRO);
    let objParametro = this.sessionService.getItemObject(SessionConstants.COMPARENDOOBJETO);
    if (objParametro !== undefined) {
      if (parametro === 'sicon') {
        this.sicon(objParametro, token);
      } else if (parametro === 'fenix') {
        this.fenix(objParametro)
      } else {
        this.listaComparendos = [];
        this.notificacionService.error(
          this.translocoService.translate('notificaciones.comparendos.error.title'),
          ""
        ).afterClosed().subscribe(result => {
          this.router.navigateByUrl('/pages/home');
        });
      }
    } else {
      this.listaComparendos = [];
      this.notificacionService.error(
        this.translocoService.translate('notificaciones.comparendos.error.title'),
        ""
      ).afterClosed().subscribe(result => {
        this.router.navigateByUrl('/pages/home');
      });
    }
  }
  /**
   * 
   * @param param 
   */
  sicon(param: { descripcion: string, modulo: string, nombreParametro: string, proveedor: string, tipoParametro: string, valorParametro: string }[], token: any) {

    //let auth_Sicon = param.filter(x => x.nombreParametro === "autenticar_sicon");
    let urlSicon = param.filter(x => x.nombreParametro === "consulta_comparendos");
    let linkBtn = param.filter(x => x.nombreParametro === "buscar_comperandos");

    this.translocoService.selectTranslateObject('comparendos').subscribe(value => {

      this.listButton = [
        {
          categoria: value.titulo,
          tipo_tramite: value.titulo,
          name: value.multa,
          link: linkBtn[0].valorParametro,
          linkIcon: "assets/icons/Comparendos_icono _home.svg",
          linkVus: false,
          direciona: true
        }
        /*,
        {
          categoria: "comparendo",
          tipo_tramite: "comparendo",
          name: "Acuerdos de pagos",
          link: environment.direccionamiento.comparendos.acuerdo_pago,
          linkIcon: "assets/icons/Acuerdos de pago_icono.svg",
          direciona: false,
          estado: false
        },*/
      ]
      let loginSicon = {
        "username": "datatools",
        "password": "datatools2021*"
      }

      this.loginService.authSicon(loginSicon).toPromise().then((tokenSicon) => {
        this.parametroService.comparendoSicon(this.tipoDocumento_sicon(this.personAny.idTipoIdentificacion + ""), this.personAny.numeroIdentificacion, urlSicon[0].valorParametro, tokenSicon.body.token).toPromise()
          .then(_result => {
            //console.log(_result);
            if (_result.status === 200) {

              let data = _result.body.respuesta.comparendoGral;
              ////console.log(data)
              if (data.length > 0) {
                this.listaComparendos = this.filtrarPorFechaMasReciente_sicon(data);
                if (this.listaComparendos.length > 0) {
                  this.dataCardTramite = {
                    linkIcon: "assets/icons/Comparendo_descripción.svg",
                    title: value.comparendosInfraccion +' '+ this.listaComparendos[0].codigoInfraccion,
                    textButton: value.pagarComparendo,
                    categoria: value.comparendos,
                    tipo_tramite: value.comparendosVigentes,
                    linkButtonMas: linkBtn[0].valorParametro,
                    linkButtonUno: linkBtn[0].valorParametro,
                    listaButtonCardTramite: [
                      {
                        type: 'fecha',
                        name: value.fechaImposicion,
                        estadoButton: false,
                        text: moment(this.listaComparendos[0].fechaImposicion + ' ' + this.listaComparendos[0].horaInfraccion).format("LL")
                      },
                      {
                        type: 'fecha',
                        name: value.estado,
                        estadoButton: false,
                        text: this.listaComparendos[0].estado
                      },
                      {
                        type: 'multa',
                        name: value.multas,
                        estadoButton: false,
                        text: this.formatterPeso.format(this.listaComparendos[0].valor)
                      }
                    ]
                  }

                }
              }
            } else {
              //console.error(_err);
              this.proceso = false;
              this.listaComparendos = [];
            }
            
            this.proceso = false;
          }).catch(errr => {
            this.proceso = false;
            this.listaComparendos = [];
          });
      })
        .catch(_err => {
          //console.error(_err);
          this.proceso = false;
          this.listaComparendos = [];
        });
    });
  }

  fenix(param: any[]) {
    this.numeroComparendos(this.tipoDocumento_fenix(this.personAny.idTipoIdentificacion + ""), this.personAny.numeroIdentificacion, param)
  }

  numeroComparendos(tipo: string, num: string, param: { descripcion: string, modulo: string, nombreParametro: string, proveedor: string, tipoParametro: string, valorParametro: string }[]) {

    let urlFenix = param.filter(x => x.nombreParametro === "consultar_comparendos");
    let linkBtn = param.filter(x => x.nombreParametro === "consultar_pagos");
    this.translocoService.selectTranslateObject('comparendos').subscribe(value => {

      this.listButton = [
        {
          categoria: value.titulo,
          tipo_tramite: value.titulo,
          name: value.multa,
          link: linkBtn[0].valorParametro,
          linkIcon: "assets/icons/Comparendos_icono _home.svg",
          linkVus: false,
          direciona: true
        }
        /*,
        {
          categoria: "comparendo",
          tipo_tramite: "comparendo",
          name: "Acuerdos de pagos",
          link: environment.direccionamiento.comparendos.acuerdo_pago,
          linkIcon: "assets/icons/Acuerdos de pago_icono.svg",
          direciona: false,
          estado: false
        },*/
      ]

      this.homeService.comparendos(tipo, num, urlFenix[0].valorParametro).toPromise()
        .then((result) => {
          let data = result.body;
          ////console.log(data)
          if (data.length > 0) {
            this.listaComparendos = this.filtrarPorFechaMasReciente(data);
            if (this.listaComparendos.length > 0) {
              this.dataCardTramite = {
                linkIcon: "assets/icons/Comparendo_descripción.svg",
                title: value.comparendosInfraccion + ' ' + this.listaComparendos[0].codigoInfraccion,
                textButton: value.pagarComparendo,
                categoria: value.comparendos,
                tipo_tramite: value.comparendosVigentes,
                linkButtonMas: linkBtn[0].valorParametro,
                linkButtonUno: linkBtn[0].valorParametro,
                listaButtonCardTramite: [
                  {
                    type: 'fecha',
                    name: value.fechaImposicion,
                    estadoButton: false,
                    text: moment(this.listaComparendos[0].fechaImposicion).format("LL")
                  },
                  {
                    type: 'fecha',
                    name: value.estado,
                    estadoButton: false,
                    text: this.listaComparendos[0].estado
                  },
                  {
                    type: 'multa',
                    name: value.multas,
                    estadoButton: false,
                    text: this.formatterPeso.format(this.listaComparendos[0].valor)
                  }
                ]
              }


            }
          }

          this.proceso = false;
        })
        .catch(err => {
          this.proceso = false;
          if (err.status === 403) {
            //this.sessionService.cerrarSession();
          }
        })
    });
  }

  filtrarPorFechaMasReciente(objetos: any[]): any[] {
    let objetoMasReciente: any = objetos[0];
    let __objeto: any[] = [];

    objetos.forEach((objeto) => {
      if (new Date(objeto.fechaImposicion) > new Date(objetoMasReciente.fechaImposicion)) {
        objetoMasReciente = objeto;
      }
    });
    __objeto.push(objetoMasReciente);
    return __objeto;
  }

  filtrarPorFechaMasReciente_sicon(objetos: any[]): any[] {
    let objetoMasReciente: any = objetos[0];
    let __objeto: any[] = [];

    objetos.forEach((objeto) => {
      if (new Date(objeto.fechaImposicion + ' ' + objeto.horaInfraccion) > new Date(objetoMasReciente.fechaImposicion + ' ' + objetoMasReciente.horaInfraccion)) {
        objetoMasReciente = objeto;
      }
    });
    __objeto.push(objetoMasReciente);
    return __objeto;
  }
}
