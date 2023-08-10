import { Component, OnInit } from '@angular/core';
import { buttonLink, dataCardTramite } from 'src/app/model/cardTramite';
import { Router } from '@angular/router';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { HomeService } from 'src/app/core/service/home.service';
import { LoginService } from 'src/app/core/service/login.service';
import { SessionService } from 'src/app/core/service/session.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss']
})
export class TramitesComponent implements OnInit {

  token: string = '';

  listaTramites: any[] = [];

  proceso: boolean = true;
  listButton :buttonLink[] = [];

  dataCardTramite: dataCardTramite = {
    linkIcon: "assets/icons/Descripción trámite.svg",
    title: "Trámite de",
    textButton: "Consultar trámites",
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

  constructor(
    private homeService: HomeService,
    private sessionService: SessionService,
    private router: Router,
    private loginService: LoginService,
    private translocoService: TranslocoService

  ) {
    this.translocoService.selectTranslateObject('tramites').subscribe(value => {
      this.listButton = [
        {
          name: value.vehiculos,
          link: "/pages/tramites/vehiculos",
          linkIcon: "assets/icons/Vehículos_icono-01.svg",
          linkVus:false,
          direciona: false
        },
        {
          name: value.actoresViales,
          link: "/pages/tramites/actores-viales",
          linkIcon: "assets/icons/Actores viales_icono-01.svg",
          linkVus:false,
          direciona: false
        },
        {
          name: value.servicioPublico,
          link: "/pages/tramites/servicio-publico",
          linkIcon: "assets/icons/Servicio público_icono-01.svg",
          linkVus:false,
          direciona: false
        },
      ]
    });

  }

  ngOnInit(): void {
    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN) + '';
    this.tramiteVigente()
  }

  filtrarPorFechaMasReciente(objetos: any[]): any[] {
    let objetoMasReciente: any = objetos[0];
    let __objeto: any[] = [];
  
    objetos.forEach((objeto) => {
      if (new Date(objeto.startTime) > new Date(objetoMasReciente.startTime)) {
        objetoMasReciente = objeto;
      }
    });
    __objeto.push(objetoMasReciente);
    return __objeto;
  }

  tramiteVigente() {
    this.translocoService.selectTranslateObject('tramites').subscribe(value => {
      this.homeService.numeroTramites(this.token).toPromise()
      .then((result) => {
  
        let data: any[] = result.body;
        if(data.length > 0) {
          ////console.log(data);
          this.listaTramites = this.filtrarPorFechaMasReciente(data);
          ////console.log(this.listaTramites);
   
  
          if(this.listaTramites.length > 0) {
            let fecha: Date = new Date(this.listaTramites[0].startTime);
            this.dataCardTramite = {
              linkIcon: "assets/icons/Descripción trámite.svg",
              title: value.tramitede+' '+this.listaTramites[0].processDefinitionName,
              textButton: value.consultar,
              categoria: value.tramitesVigentes,
              tipo_tramite: value.tramitesVigentes,
              linkButtonMas: environment.direccionamiento.tramite.ver_mas+ "?token="+this.token,
              linkButtonUno: environment.direccionamiento.tramite.consultar_tramite + this.listaTramites[0].businessKey+ "&token="+this.token,
              listaButtonCardTramite: [
                {
                  type: 'fecha',
                  name: value.fecha,
                  estadoButton: false,
                  text: moment(this.listaTramites[0].startTime).format("LL")
                },
                {
                  type: 'fecha',
                  name: value.estado,
                  estadoButton: false,
                  text: this.listaTramites[0].task.name
                }
              ]
            }
            this.proceso = false;
          }
        } else {
          this.proceso = false;
        }
  
        
        
      })
      .catch(err => {
        this.proceso = false;
        if(err.status === 403) {
          //this.sessionService.cerrarSession();
        }
      })   
    });
    
  }


}
