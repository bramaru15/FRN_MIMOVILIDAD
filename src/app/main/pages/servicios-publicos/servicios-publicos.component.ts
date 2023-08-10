import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { buttonLink, listSubTramites } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicios-publicos',
  templateUrl: './servicios-publicos.component.html',
  styleUrls: ['./servicios-publicos.component.sass']
})
export class ServiciosPublicosComponent {

  proceso:boolean=false;
  listButton: buttonLink[] = []
  listSubTramites: listSubTramites[] =[]
 
  constructor( private translocoService: TranslocoService){

    this.translocoService.selectTranslateObject('serviciosPublicos').subscribe(value => {
      this.listButton = [{
        name: value.tramitesServicios,
        link:"",
        versionCardIcon:'v2',
        tamanoTitulo: 'h1',
        categoria: value.centroAyuda,
        tipo_tramite: value.asistenteVirtual,
        subText: value.subText1,
        btnVersion: "v2",
        styleWithText: "300%",
        linkIcon: "assets/icons/Servicio público_icono-01.svg",
        linkVus:false,
        //linkImg: "",
        direciona: false
      }]
      this.listSubTramites = [
        {
          title: value.expedicion,
          filter: [value.filterExpedicion1,value.filterExpedicion2,value.filterExpedicion3],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_expedicion.ver_requisitos,
              name:  value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus:false,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Expedición TO",
              nameTablero:"Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_expedicion.expedir,
              name: value.btnExpedicion,
              linkIcon: "assets/icons/expedir licencia.svg",
              linkVus:true,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Expedición TO",
              nameTablero:"Expedir tarjeta de operación"
            }
          ]
        },
        {
          title: value.renovacion,
          filter: [value.filterRenovacion1,value.filterRenovacion2,value.filterRenovacion1],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_renovacion.ver_requisitos,
              name:  value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus:false,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Renovación TO",
              nameTablero:"Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_renovacion.renovar,
              name: value.renovar,
              linkIcon: "assets/icons/Icono_renovación licencia.svg",
              linkVus:true,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Renovación TO",
              nameTablero:"Renovar tarjeta de operación"
            }
          ]
        },
        {
          title: value.cancelacion,
          filter: [value.filterCancelacion1,value.filterCancelacion2,value.filterCancelacion3],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_cancelacion.ver_requisitos,
              name:  value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus:false,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Cancelación TO",
              nameTablero:"Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_cancelacion.cancelar,
              name: value.filterCancelacion3,
              linkIcon: "assets/icons/Cancelar licencia_icono.svg",
              linkVus:true,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Cancelación TO",
              nameTablero: "Cancelar tarjeta de operación"
            }
          ]
        },
        {
          title: value.duplicado,
          filter: [value.filterDuplicado1,value.filterDuplicado2,value.filterDuplicado3],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_duplicado.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus:false,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Duplicado TO",
              nameTablero:"Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.servicio_publico.tarjeta_operacion_duplicado.duplicado,
              name: value.duplicado,
              linkIcon: "assets/icons/Icono_duplicado licencia.svg",
              linkVus:true,
              direciona: true,
              categoria: "Servicios públicos",
              tipo_tramite: "Duplicado TO",
              nameTablero:"Duplicado tarjeta de operación"
            }
          ]
        }
        
        
      ]
    })

  }

}
