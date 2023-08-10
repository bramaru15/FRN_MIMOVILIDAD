import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { HomeService } from 'src/app/core/service/home.service';
import { LoginService } from 'src/app/core/service/login.service';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { SessionService } from 'src/app/core/service/session.service';
import { buttonLink, dataCardTramite } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-inmovilizacion',
  templateUrl: './inmovilizacion.component.html',
  styleUrls: ['./inmovilizacion.component.scss']
})
export class InmovilizacionComponent {
  token: string = '';

  listaTramites: any[] = [];

  personAny: any

  proceso: boolean = true;

  listButton: buttonLink[] = [];

  dataCardTramite: dataCardTramite = {
    linkIcon: '',
    title: '',
    linkButtonMas: '',
    linkButtonUno: '',
    textButton: '',
    listaButtonCardTramite: []
  };

  constructor(
    private homeService: HomeService,
    private sessionService: SessionService,
    private router: Router,
    private parametroService: ParametroService,
    private loginService: LoginService,
    private translocoService: TranslocoService,
    private notificacionService: NotificacionService,
  ) { }

  ngOnInit(): void {
    this.personAny = this.sessionService.getItemObject(SessionConstants.PERSON);
    let token = this.sessionService.getItemInSession(SessionConstants.TOKENSICON);
    let parametro = this.sessionService.getItemLocal(SessionConstants.INMOVILIPARAMETRO);
    let objParametro = this.sessionService.getItemObject(SessionConstants.INMOVILIOBJETO);
    //console.log(objParametro);
    if (objParametro !== undefined) {
      if (parametro === 'sicon') {
        this.sicon(objParametro, token);
      } else if (parametro === 'fenix') {
        this.fenix(objParametro)
      } else {
        this.listaTramites = [];
        this.notificacionService.error(
          this.translocoService.translate('notificaciones.inmovilizaciones.error'),
          ""
        ).afterClosed().subscribe(result => {
          this.router.navigateByUrl('/pages/home');
        });
      }
    } else {
      this.listaTramites = [];
      this.notificacionService.error(
        this.translocoService.translate('notificaciones.inmovilizaciones.error'),
        ""
      ).afterClosed().subscribe(result => {
        this.router.navigateByUrl('/pages/home');
      });
    }
  }

  sicon(param: { descripcion: string, modulo: string, nombreParametro: string, proveedor: string, tipoParametro: string, valorParametro: string }[], token: any) {
    let urlSicon = param.filter(x => x.nombreParametro === "consulta_inmovilizaciones");
    let linkBtn = param.filter(x => x.nombreParametro === "buscar_inmovilizaciones");

    this.translocoService.selectTranslateObject('inmovilizaciones').subscribe(value => {
      this.listButton = [
        {
          name: value.consultaPlaca,
          link: "/pages/inmovilizaciones/consulta-vehiculos",
          linkIcon: "assets/icons/Icono_tipo_tramite_matricula.svg",
          linkVus: false,
          direciona: false
        },
        {
          name: value.detalles,
          link: environment.direccionamiento.inmovilizaciones.detalles_tramite,
          linkIcon: "assets/icons/levata preda v2.svg",
          linkVus: false,
          direciona: true,
          categoria: 'Inmovilizaciones',
          tipo_tramite: 'Trámites relacionados'
        },
        {
          name: value.salidaPatios,
          link: environment.direccionamiento.inmovilizaciones.salida_patios,
          linkIcon: "assets/icons/Inmovilizaciones_icono.svg",
          linkVus: true,
          direciona: true,
          categoria: 'Inmovilizaciones',
          tipo_tramite: 'Trámites relacionados'
        },
      ]
      let loginSicon = {
        "username": "datatools",
        "password": "datatools2021*"
      }

      this.loginService.authSicon(loginSicon).toPromise().then((tokenSicon) => {
        this.parametroService.inmovilizacionSicon(this.tipoDocumento_sicon(this.personAny.idTipoIdentificacion + ""), this.personAny.numeroIdentificacion, urlSicon[0].valorParametro, tokenSicon.body.token).toPromise()
          .then(resultado => {
            if (resultado.status === 200) {
              let data = resultado.body.inmovilizaciones;
              if (data.length > 0) {
                this.listaTramites = this.filtrarPorFechaMasReciente(data);
                if (this.listaTramites.length > 0) {
                  this.dataCardTramite = {
                    linkIcon: "assets/icons/Vehiculos_inmovilizados_descripcion.svg",
                    title: value.vehiculoPlaca + ' ' + this.listaTramites[0].placa,
                    textButton: value.salida,
                    linkButtonMas: linkBtn[0].valorParametro + '?datos_enviados=S&obj_env_placa=&obj_par_tipo_doc=' + this.tipoDocumento_sicon(this.personAny.idTipoIdentificacion + "") + '&obj_per_nro_doc=' + this.personAny.numeroIdentificacion,
                    categoria: "Inmovilizaciones",
                    tipo_tramite: "Vehículos inmovilizados",
                    linkButtonUno: environment.direccionamiento.inmovilizaciones.salida_patios,
                    linkVusBtnUno: true,
                    listaButtonCardTramite: [
                      {
                        type: 'fecha',
                        name: value.fechaIngreso,
                        estadoButton: false,
                        text: moment(this.listaTramites[0].fechaInmovilizacion).format("LL")
                      },
                      {
                        type: 'ubicacion',
                        name: value.patio,
                        estadoButton: true,
                        text: this.listaTramites[0].nombrePatio,
                        linkUbicacion: this.urlUbicacion(this.listaTramites[0].direccionPatio)
                      },
                      {
                        type: 'fecha',
                        name: value.comparendo,
                        estadoButton: false,
                        text: this.comparendos(this.listaTramites[0].comparendos)
                      }
                    ]
                  }
                }
              }
            } else {
              this.proceso = false;
              this.listaTramites = [];
            }

            this.proceso = false;
          })
          .catch(err => {
            this.proceso = false;
            this.listaTramites = [];
          })
      }).catch(errr => {
        this.proceso = false;
        this.listaTramites = [];
      });
    })
  }

  comparendos(list: any) {
    let comparendos = ""
    for (let index of list) {
      comparendos = comparendos + index.codigoInfraccion;
    }
    return comparendos;
  }

  urlUbicacion(direccion: string) {
    let direccionGmap = direccion.replace(/\s/g, "+");
    direccionGmap = direccionGmap.replace("#", "%23");
    let urlGmap = "https://www.google.com/maps/place/" + direccionGmap;
    return urlGmap;
  }

  fenix(param: any[]) {
    //
    this.translocoService.selectTranslateObject('inmovilizaciones').subscribe(value => {
      this.listButton = [
        {
          name: value.consultaPlaca,
          link: "/pages/inmovilizaciones/consulta-vehiculos",
          linkIcon: "assets/icons/Icono_tipo_tramite_matricula.svg",
          linkVus: false,
          direciona: false
        },
        {
          name: value.detalles,
          link: environment.direccionamiento.inmovilizaciones.detalles_tramite,
          linkIcon: "assets/icons/levata preda v2.svg",
          linkVus: false,
          direciona: true,
          categoria: 'Inmovilizaciones',
          tipo_tramite: 'Trámites relacionados'
        },
        {
          name: value.salidaPatios,
          link: environment.direccionamiento.inmovilizaciones.salida_patios,
          linkIcon: "assets/icons/Inmovilizaciones_icono.svg",
          linkVus: true,
          direciona: true,
          categoria: 'Inmovilizaciones',
          tipo_tramite: 'Trámites relacionados'
        },
      ]
    })
    this.listaTramites = [];
    this.proceso = false;
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

  filtrarPorFechaMasReciente(objetos: any[]): any[] {
    let objetoMasReciente: any = objetos[0];
    let __objeto: any[] = [];

    objetos.forEach((objeto) => {
      if (new Date(objeto.fechaInmovilizacion) > new Date(objetoMasReciente.fechaInmovilizacion)) {
        objetoMasReciente = objeto;
      }
    });
    __objeto.push(objetoMasReciente);
    return __objeto;
  }
}
