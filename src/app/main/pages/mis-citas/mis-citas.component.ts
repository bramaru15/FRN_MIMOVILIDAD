import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { HomeService } from 'src/app/core/service/home.service';
import { SessionService } from 'src/app/core/service/session.service';
import { buttonLink, dataCardTramite } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.sass']
})
export class MisCitasComponent implements OnInit {
  token: any;
  titulo: string = '';
  proceso: boolean = true;
  listaCitas: any[] = [];
  puntoAtencion: string = '';
  direccion: string = '';
  latitude: string = '';
  longitude: string = '';
  cardText: string = "";
  dataCardTramite: dataCardTramite = {
    linkIcon: '',
    title: '',
    linkButtonMas: '',
    linkButtonUno: '',
    textButton: '',
    listaButtonCardTramite: []
  }
  listButton: buttonLink[] = [];

  constructor(
    private homeService: HomeService,
    private sessionService: SessionService,
    private router: Router, private translocoService: TranslocoService,

  ) {
    this.translocoService.selectTranslateObject('misCitas').subscribe(value => {



    });
  }

  ngOnInit(): void {
    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN) + '';
    this.miscitas();
  }




  miscitas() {
    this.translocoService.selectTranslateObject('misCitas').subscribe(value => {
      this.listButton = [
        {
          name: value.nueva,
          link: environment.direccionamiento.citas.nueva_cita,
          linkIcon: "assets/icons/Citas_icono_home.svg",
          linkVus: true,
          direciona: true,
          categoria: value.titulo,
          tipo_tramite: value.citas,
        },
        {
          name: value.historico,
          link: environment.direccionamiento.citas.mis_citas,
          linkIcon: "assets/icons/Mis_citas_icono.svg",
          linkVus: true,
          direciona: true,
          categoria: value.titulo,
          tipo_tramite: value.citas,
        },
        {
          name: value.comoAgendar,
          link: environment.direccionamiento.citas.como_agendar_cita,
          linkIcon: "assets/icons/Como_agendar_cita_icono-01.svg",
          linkVus: false,
          direciona: true,
          categoria: value.titulo,
          tipo_tramite: value.citas,
        },
      ]

      this.homeService.numeroCitas(this.token).toPromise()
        .then(async (result) => {
          let data: any[] = result.body.filter((x: any) => x.status === 'ACTIVE');
          if (data.length > 0) {
            ////console.log(data);
            this.listaCitas = this.filtrarPorFechaMasReciente(data);
            ////console.log("Cita mas reciente: ");
            ////console.log(this.listaCitas);
            if (this.listaCitas.length > 0) {
              await this.puntosAtencion(this.token, this.listaCitas[0].scheduleConfigId);

              ////console.log("P: " + this.puntoAtencion);
              ////console.log(this.direccion);
              ////console.log(this.urlGmaps());
              //let fecha: Date = new Date(this.listaCitas[0].creationDate);
              this.titulo = this.listaCitas[0].requestType;
              let dia = moment(this.listaCitas[0].date + ":" + this.listaCitas[0].time, "YYYY-MM-DD HH:mm");
              let hour = dia.format("h:mm a");

              ////console.log(hour + environment.direccionamiento.citas.consultar_tramite + this.listaCitas[0].id);

              this.dataCardTramite = {
                linkIcon: "assets/icons/Próxima cita.svg",
                title: this.listaCitas[0].requestType,
                textButton: value.reagendar,
                categoria: value.titulo,
                tipo_tramite: value.proximaCita,
                linkButtonUno: environment.direccionamiento.citas.consultar_tramite + this.listaCitas[0].id + "&token=" + this.token,
                linkButtonMas: environment.direccionamiento.citas.ver_mas + "?token=" + this.token,
                listaButtonCardTramite: [
                  {
                    type: 'agenda',
                    name: value.fecha,
                    estadoButton: true,
                    text: moment(this.listaCitas[0].date).format("LL"),
                    icalendar: {
                      fecha: {
                        year: parseInt(dia.format("YYYY")),
                        month: parseInt(dia.format("MM")),
                        date: parseInt(dia.format("DD")),
                        hour: parseInt(dia.format("h")),
                        minute: parseInt(dia.format("mm")),
                      },
                      summary: this.listaCitas[0].requestType,
                      description: this.listaCitas[0].requestType,
                      location: this.puntoAtencion + this.direccion
                    }
                  },
                  {
                    type: 'fecha',
                    name: value.hora,
                    estadoButton: false,
                    text: hour
                  },
                  {
                    type: 'ubicacion',
                    name: value.puntoAtencion,
                    estadoButton: true,
                    text: this.puntoAtencion,
                    linkUbicacion: this.urlGmaps()
                  }
                ]
              }



              this.proceso = false;
            }
          } else {
            this.proceso = false;
          }
        }).catch(err => {
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
      if (new Date(objeto.date + " " + objeto.time) < new Date(objetoMasReciente.date + " " + objetoMasReciente.time)) {
        objetoMasReciente = objeto;
      }
    });
    __objeto.push(objetoMasReciente);
    return __objeto;
  }

  async puntosAtencion(token: string, id: any) {

    const result = await this.homeService.puntosAtencion(this.token).toPromise()
    let data: any[] = result.body;

    data.forEach((objeto) => {

      if (objeto.scheduleConfigs.find((i: any) => i.id === id)) {
        this.puntoAtencion = objeto.name;
        this.direccion = objeto.address;
        this.latitude = objeto.latitude;
        this.longitude = objeto.longitude;
      }
    })
  }

  urlGmaps(): string {
    let urlGmap = "https://www.google.com/maps/search/?api=1&query=" + this.latitude + "%2C" + this.longitude;
    return urlGmap;
  }
}
