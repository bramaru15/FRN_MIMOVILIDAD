import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { HomeService } from 'src/app/core/service/home.service';
import { LoginService } from 'src/app/core/service/login.service';
import { SessionService } from 'src/app/core/service/session.service';
import jwt_decode from "jwt-decode";
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { buttonLink } from 'src/app/model/cardTramite';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: string = '';
  personAny: any
  usuario: any = "USUARIO";
  cantidadTramites: number = 0;
  cantidadCitas: number = 0;
  cantidadComperandos: number = 0;
  cantidadInmovilizaciones: number = 0;
  breakpoint = 4
  breakpointOS = 2
  proceso: boolean = true;
  listButton: buttonLink[] = [];
  intervalo: any;

  labelPosition: 'before' | 'after' = 'after'

  window: Window & typeof globalThis = window;



  constructor(
    private homeService: HomeService,
    private sessionService: SessionService,
    private router: Router,
    private loginService: LoginService,
    private parametroService: ParametroService,
    private notificacionService: NotificacionService,
    private translocoService: TranslocoService,
  ) {
    this.translocoService.selectTranslateObject('home').subscribe(value => {

      this.listButton = [
        {
          name: value.asesoriasyconsultas,
          link: "/pages/asesorias",
          subText: value.explora,
          btnText: value.explorar,
          styleWithText: "350%",
          direciona: false,
          linkIcon: "",
          linkVus: false,
          btnList: [
            {
              btnText: value.explorar,
              btnVersion: "v2",
              link: "/pages/asesorias",
              direciona: false
            }
          ]
        },
        {
          name: value.mapasBogota,
          link: "/pages/mapas",
          subText: value.descubre,
          btnText: value.verMas,
          styleWithText: "350%",
          direciona: false,
          linkIcon: "",
          linkVus: false,
          btnList: [
            {
              btnText: value.verMas,
              btnVersion: "v1",
              link: "/pages/mapas",
              direciona: false
            }
          ]
        },
        {
          name: value.firmaElectronica,
          link: "/pages/firma-electronica",
          subText: value.activarFirmaElectronica,
          btnText: value.activar,
          styleWithText: "350%",
          direciona: false,
          linkIcon: "",
          linkVus: false,
          btnList: [
            {
              btnText: value.activar,
              btnVersion: "v1",
              link: "/pages/firma-electronica",
              direciona: false
            }
          ]
        },
        {
          name: value.notificacion,
          link: "/pages/notificacion-electronica",
          subText: value.correo,
          btnText: value.autorizar,
          btnVersion: "v1",
          styleWithText: "350%",
          direciona: false,
          linkIcon: "",
          linkVus: false,
          btnList: [
            {
              btnText: value.autorizar,
              btnVersion: "v1",
              link: "/pages/notificacion-electronica",
              direciona: false
            }
          ]
        },


      ]

    });

    this.onResize();

    if (this.sessionService.getItem(SessionConstants.USER_NAME) !== null) {
      this.usuario = this.sessionService.getItem(SessionConstants.USER_NAME_CORTO) === null ? "" : this.sessionService.getItem(SessionConstants.USER_NAME_CORTO);
    }
  }

  minString(text: string): string {
    return text[0].toUpperCase() + text.substring(1, text.length).toLowerCase();
  }

  ngOnInit(): void {
    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN) + '';
    this.personAny = this.sessionService.getItemObject(SessionConstants.PERSON);
    //this.loadScriptChatbot();
    this.numeroTramites();
    var that = this;
    this.intervalo = setInterval(function () {
      that.numeroTramites();
    }, 30000);
    this.sessionService.setItemLocal('notificacion_Metodo', this.intervalo)
  }

  /*private loadScriptChatbot() {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.async = true;
    chatScript.src = 'https://webchat-cls45-dal.i6.inconcertcc.com/v3/click_to_chat?token=9EB4BD8DB699F4781504C26A8F373990';
    document.body.appendChild(chatScript);
  }*/

  routerClick(link: string) {
    switch (link) {
      case 'cita':
        this.router.navigateByUrl('/pages/mis-citas');
        break;
      case 'comparendo':
        this.router.navigateByUrl('/pages/comparendos');
        break;
      case 'inmovilizacion':
        this.router.navigateByUrl('/pages/inmovilizaciones');
        break;
      case 'tramite':
        this.router.navigateByUrl('/pages/tramites');
        break;
    }
  }

  onResize() {

    if (window.innerWidth <= 820) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 4;
    }

  }

  numeroTramites() {
    this.homeService.numeroTramites(this.token).toPromise()
      .then((result) => {
        this.numeroCitas();
        let data = result.body;
        if (data.length > 0) {
          this.cantidadTramites = data.length;
          this.sessionService.setItemLocal('cantidadTramites', this.cantidadTramites)
        }
        else {
          this.cantidadTramites = 0;
          this.sessionService.setItemLocal('cantidadTramites', 0)
        }
      })
      .catch(err => {
        this.proceso = false;
        clearInterval(this.intervalo);
        if (err.status === 403) {
          this.sessionService.cerrarSession();
        }
      })
  }

  numeroCitas() {
    this.homeService.numeroCitas(this.token).toPromise()
      .then((result) => {
        this.numeroComparendos();
        if (result.body.length > 0) {
          //status: "ACTIVE"
          let data: any[] = result.body.filter((x: any) => x.status === 'ACTIVE');
          this.cantidadCitas = data.length;
          this.sessionService.setItemLocal('cantidadCitas', this.cantidadCitas)
        }
        else {
          this.cantidadCitas = 0;
          this.sessionService.setItemLocal('cantidadCitas', 0)
        }
      })
      .catch(err => {
        this.proceso = false;
        clearInterval(this.intervalo);
        if (err.status === 403) {
          this.sessionService.cerrarSession();
        }
      })
  }

  sicon(param: { descripcion: string, modulo: string, nombreParametro: string, proveedor: string, tipoParametro: string, valorParametro: string }[], token: any) {
    let urlSicon = param.filter(x => x.nombreParametro === "consulta_comparendos");

    let loginSicon = {
      "username": "datatools",
      "password": "datatools2021*"
    }

    this.loginService.authSicon(loginSicon).toPromise().then((tokenSicon) => {
      this.parametroService.comparendoSicon(this.tipoDocumento_sicon(this.personAny.idTipoIdentificacion + ""), this.personAny.numeroIdentificacion, urlSicon[0].valorParametro, tokenSicon.body.token).toPromise()
        .then(_result => {
          this.numeroInmovilizacion()
          //console.log(_result);
          if (_result.status === 200) {

            let data = _result.body.respuesta.comparendoGral;
            ////console.log(data)
            if (data.length > 0) {
              this.cantidadComperandos = data.length;
              this.sessionService.setItemLocal('cantidadComperandos', this.cantidadComperandos)
            } else {
              this.cantidadComperandos = 0;
              this.sessionService.setItemLocal('cantidadComperandos', 0)
            }
          } else if (_result.status === 401) {
            //console.error(_err);
            this.proceso = false;
            //clearInterval(this.intervalo);
            //this.sessionService.cerrarSession();
            this.cantidadComperandos = 0;
            this.sessionService.setItemLocal('cantidadComperandos', 0)
          } else {
            this.proceso = false;
            this.cantidadComperandos = 0;
            this.sessionService.setItemLocal('cantidadComperandos', 0)
          }

        })
        .catch(_err => {
          //console.error(_err);
          this.proceso = false;
          this.cantidadComperandos = 0;
          this.sessionService.setItemLocal('cantidadComperandos', 0)
          //clearInterval(this.intervalo);
          /*if (_err.status === 401) {
            clearInterval(this.intervalo);
            this.sessionService.cerrarSession();
          }*/
        });
    }).catch(errr => {
      this.proceso = false;
      this.cantidadComperandos = 0;
      this.sessionService.setItemLocal('cantidadComperandos', 0)
    });

  }

  fenix(param: { descripcion: string, modulo: string, nombreParametro: string, proveedor: string, tipoParametro: string, valorParametro: string }[]) {

    let urlFenix = param.filter(x => x.nombreParametro === "consultar_comparendos");

    this.homeService.comparendos(this.tipoDocumento_fenix(this.personAny.idTipoIdentificacion + ""), this.personAny.numeroIdentificacion, urlFenix[0].valorParametro).toPromise()
      .then((result) => {
        this.numeroInmovilizacion()
        let data = result.body;
        if (data.length > 0) {
          this.cantidadComperandos = data.length;
          this.sessionService.setItemLocal('cantidadComperandos', this.cantidadComperandos)
        }
        else {
          this.cantidadComperandos = 0;
          this.sessionService.setItemLocal('cantidadComperandos', 0)
        }
      })
      .catch(err => {
        this.proceso = false;
        this.cantidadComperandos = 0;
        this.sessionService.setItemLocal('cantidadComperandos', 0)
      })
  }

  numeroComparendos() {
    let token = this.sessionService.getItemInSession(SessionConstants.TOKENSICON);
    let parametro = this.sessionService.getItemLocal(SessionConstants.COMPARENDOPARAMETRO);
    let objParametro = this.sessionService.getItemObject(SessionConstants.COMPARENDOOBJETO);
    console.log(this.tipoDocumento_sicon(this.personAny.idTipoIdentificacion + ""));
    if (parametro === 'sicon') {
      this.sicon(objParametro, token);
    } else if (parametro === 'fenix') {
      this.fenix(objParametro)
    } else {
      this.cantidadComperandos = 0;
      this.sessionService.setItemLocal('cantidadComperandos', 0)
    }
  }

  numeroInmovilizacion() {
    let token = this.sessionService.getItemInSession(SessionConstants.TOKENSICON);
    let parametro = this.sessionService.getItemLocal(SessionConstants.INMOVILIPARAMETRO);
    let objParametro = this.sessionService.getItemObject(SessionConstants.INMOVILIOBJETO);
    if (parametro === 'sicon') {
      this.siconInmov(objParametro, token);
    } else if (parametro === 'fenix') {
      this.fenixInmov(objParametro)
    } else {
      this.cantidadInmovilizaciones = 0;
      this.sessionService.setItemLocal('cantidadInmovilizacion', 0)
    }
  }

  siconInmov(param: { descripcion: string, modulo: string, nombreParametro: string, proveedor: string, tipoParametro: string, valorParametro: string }[], token: any) {
    let urlSicon = param.filter(x => x.nombreParametro === "consulta_inmovilizaciones");
    console.log(this.tipoDocumento_sicon(this.personAny.idTipoIdentificacion + ""));

    let loginSicon = {
      "username": "datatools",
      "password": "datatools2021*"
    }

    this.loginService.authSicon(loginSicon).toPromise().then((tokenSicon) => {
      this.parametroService.inmovilizacionSicon(this.tipoDocumento_sicon(this.personAny.idTipoIdentificacion + ""), this.personAny.numeroIdentificacion, urlSicon[0].valorParametro, tokenSicon.body.token).toPromise()
        .then(respuesta => {
          if (respuesta.status === 200) {

            let data = respuesta.body.cantidadInmovilizaciones;
            ////console.log(data)
            if (data > 0) {
              this.cantidadInmovilizaciones = data;
              this.sessionService.setItemLocal('cantidadInmovilizacion', this.cantidadInmovilizaciones)
            } else {
              this.cantidadInmovilizaciones = 0;
              this.sessionService.setItemLocal('cantidadInmovilizacion', 0)
            }
          } else if (respuesta.status === 401) {
            //console.error(_err);
            this.proceso = false;
            //clearInterval(this.intervalo);
            //this.sessionService.cerrarSession();
          } else {
            this.proceso = false;
            this.cantidadInmovilizaciones = 0;
            this.sessionService.setItemLocal('cantidadInmovilizacion', 0)
          }

          this.proceso = false;
        })
        .catch(err => {
          this.proceso = false;
          this.cantidadInmovilizaciones = 0;
          this.sessionService.setItemLocal('cantidadInmovilizacion', 0)
          //clearInterval(this.intervalo);
          /*if (err.status === 401) {
            clearInterval(this.intervalo);
            this.sessionService.cerrarSession();
          }*/
        })
    }).catch(errr => {
      this.proceso = false;
      this.cantidadInmovilizaciones = 0;
      this.sessionService.setItemLocal('cantidadInmovilizacion', 0)
    });
  }

  fenixInmov(param: { descripcion: string, modulo: string, nombreParametro: string, proveedor: string, tipoParametro: string, valorParametro: string }[]) {
    //
    this.cantidadInmovilizaciones = 0;
    this.sessionService.setItemLocal('cantidadInmovilizacion', 0)
    this.proceso = false;
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
}
