import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { buttonLink, listSubTramites } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.sass']
})
export class VehiculosComponent {
  proceso: boolean = false;
  listSubTramites: listSubTramites[] = [];
  listButton: buttonLink[] = []

  constructor(private translocoService: TranslocoService
  ) {

    this.translocoService.selectTranslateObject('vehiculo').subscribe(value => {

      this.listButton = [{
        name: "Trámites de Vehículos",
        link: "",
        linkVus: false,
        tamanoTitulo: 'h1',
        versionCardIcon: 'v2',
        categoria: "Centro de ayuda",
        tipo_tramite: "Asistente Virtual",
        subText: value.button.text,
        btnVersion: "v2",
        styleWithText: "300%",
        linkIcon: "assets/icons/Vehículos_icono-01.svg",
        //linkImg: "",
        direciona: false
      }];

      this.listSubTramites = [
        {
          title: value.traspaso,
          filter: [value.traspaso, value.derechosyrequisitos, value.traspasarVehiculo],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.vehiculo.traspaso_propiedad.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus: false,
              direciona: true,
              categoria: "Vehículos",
              tipo_tramite: "Traspaso de propiedad",
              nameTablero: "Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.vehiculo.traspaso_propiedad.traspaso_propiedad,
              name: value.traspasarVehiculo,
              linkIcon: "assets/icons/Vehículos_icono-01.svg",
              linkVus: true,
              direciona: true,
              categoria: "Vehículos",
              tipo_tramite: "Traspaso de propiedad",
              nameTablero: "Transpasar vehículo"
            }
          ]
        },
        {
          title: value.matricula,
          filter: [value.matricula, value.derechosyrequisitos, value.matricular],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.vehiculo.matricula.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus: false,
              direciona: true,
              categoria: "Vehículos",
              tipo_tramite: "Matrícula",
              nameTablero: "Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.vehiculo.matricula.matricula,
              name: value.matricular,
              linkIcon: "assets/icons/Icono_tipo_tramite_matricula.svg",
              linkVus: true,
              direciona: true,
              categoria: "Vehículos",
              tipo_tramite: "Matrícula",
              nameTablero: "Matricular vehículo"
            }
          ]
        },
        {
          title: value.insclevantPrenda,
          filter: [value.insclevantPrenda, value.derechosyrequisitos, value.inscribirPrenda, value.levantarPrenda],
          subtramite: [
            {
              link: environment.direccionamiento.tramite.vehiculo.inscripcion_levantamiento_pre.ver_requisitos,
              name: value.derechosyrequisitos,
              linkIcon: "assets/icons/Ver contraseña_icono.svg",
              linkVus: false,
              direciona: true,
              categoria: "Vehículos",
              tipo_tramite: "Prenda",
              nameTablero:"Ver derechos y requisitos"
            },
            {
              link: environment.direccionamiento.tramite.vehiculo.inscripcion_levantamiento_pre.prenda,
              name: value.inscribirPrenda,
              linkIcon: "assets/icons/Icono_recategorización licencia.svg",
              linkVus: true,
              direciona: true,
              categoria: "Vehículos",
              tipo_tramite: "Prenda",
              nameTablero:"Inscribir prenda"
            },
            {
              link: environment.direccionamiento.tramite.vehiculo.inscripcion_levantamiento_pre.prenda2,
              name: value.levantarPrenda,
              linkIcon: "assets/icons/levata preda v2.svg",
              linkVus: true,
              direciona: true,
              categoria: "Vehículos",
              tipo_tramite: "Prenda",
              nameTablero:"Levantar prenda"
            }
          ]
        }


      ]
    })

  }
}
