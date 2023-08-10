import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { buttonLink, listSubTramites } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-actores-viales',
  templateUrl: './actores-viales.component.html',
  styleUrls: ['./actores-viales.component.sass']
})
export class ActoresVialesComponent {

  URL_REDIRECT = environment.urlRedirect;

  constructor(
    private translocoService: TranslocoService,
  ) {
    this.translocoService.selectTranslateObject('actoresViales').subscribe(value => {
      this.listButton = [{
        name: value.titulo,
        link: "",
        linkVus: false,
        versionCardIcon: 'v2',
        tamanoTitulo: 'h1',
        categoria: value.categoria,
        tipo_tramite: value.asistente,
        subText: value.subText,
        btnVersion: "v2",
        styleWithText: "300%",
        linkIcon: "assets/icons/Actores viales_icono-01.svg",
        //linkImg: "",
        direciona: false
      }]
      this.listSubTramites = [
        {
          title: value.expedicion,
          filter: [value.expedicion, value.derechosyrequisitos, value.filterExpedicion2],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.actores_viales.expedicion_licencia_conduccion.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus: false,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Expedicion licencia",
              nameTablero: "Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.actores_viales.expedicion_licencia_conduccion.expedir_licencia_conduccion,
              name: value.btbExpedicion,
              linkIcon: "assets/icons/expedir licencia.svg",
              linkVus: true,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Expedicion licencia",
              nameTablero: "Expedir licencia de conducción"
            }
          ]
        },
        {
          title: value.renovacion,
          filter: [value.renovacion, value.derechosyrequisitos, value.renovacion],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.actores_viales.renovacion_licencia_conduccion.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus: false,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Renovación licencia",
              nameTablero: "Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.actores_viales.renovacion_licencia_conduccion.renovar_licencia_conduccion,
              name: "Renovar licencia de conducción",
              linkIcon: "assets/icons/Icono_renovación licencia.svg",
              linkVus: true,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Renovación licencia",
              nameTablero: "Renovar licencia de conducción"
            }
          ]
        },
        {
          title: value.recategorizacion,
          filter: [value.recategorizacion, value.filterRecategorizacion1, value.derechosyrequisitos, value.filterRecategorizacion2],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.actores_viales.recategorizacion_licencia_conducción.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus: false,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Recategorización licencia",
              nameTablero: "Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.actores_viales.recategorizacion_licencia_conducción.recategorizacion_licencia_conduccion_arriba,
              name: value.filterRecategorizacion1,
              linkIcon: "assets/icons/Recategorizar licencia arriba_icono.svg",
              linkVus: true,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Recategorización licencia",
              nameTablero: "Recategorización licencia de conducción hacia arriba"
            },
            {
              link: environment.direccionamiento.tramite.actores_viales.recategorizacion_licencia_conducción.recategorizacion_licencia_conduccion_abajo,
              name: value.filterRecategorizacion2,
              linkIcon: "assets/icons/Recategorizar licencia abajo_icono.svg",
              linkVus: true,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Recategorización licencia",
              nameTablero: "Recategorización licencia de conducción hacia abajo"
            }
          ]
        },
        {
          title: value.duplicado,
          filter: [value.duplicado, value.derechosyrequisitos, value.duplicado],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.actores_viales.duplicado_licencia_conduccion.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus: false,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Duplicado licencia",
              nameTablero: "Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.actores_viales.duplicado_licencia_conduccion.duplicado_licencia_conduccion,
              name: value.duplicado,
              linkIcon: "assets/icons/Icono_duplicado licencia.svg",
              linkVus: true,
              direciona: true,
              categoria: "Actores viales",
              tipo_tramite: "Duplicado licencia",
              nameTablero: "Duplicado licencia de conducción"
            }
          ]
        }

      ]
    })
  }
  listButton: buttonLink[] = [];
  listSubTramites: listSubTramites[] = [];
  proceso: boolean = false;

}
