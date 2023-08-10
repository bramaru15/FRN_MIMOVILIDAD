import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { dataCardTramite } from 'src/app/model/cardTramite';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TableroService } from 'src/app/core/service/tablero.service';
import { registroTablero } from 'src/app/model/tablero';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { SessionService } from 'src/app/core/service/session.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';

@Component({
  selector: 'app-card-tramites',
  templateUrl: './card-tramites.component.html',
  styleUrls: ['./card-tramites.component.scss']
})
export class CardTramitesComponent implements OnInit {
  icono: SafeHtml = "";

  ver_mas: string = "Ver más"

  token: string | null = '';

  deviceInfo: any;

  window: Window & typeof globalThis = window;

  @Input() dataCardTramite: dataCardTramite = {
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
      }
    ]
  }

  breakpoint: number = 3;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private sessionService: SessionService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.onResize();
  }
  
  ngOnInit(): void {
    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN);
    this.http.get(this.dataCardTramite.linkIcon, { responseType: 'text' })
      .subscribe(svg => {
        this.icono = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }

  tablero(name: string): void {
    let registro: registroTablero = {
      tipo: TipoReporte.TRAMITE,
      categoria: this.dataCardTramite.categoria+'',
      tipoTramite: this.dataCardTramite.tipo_tramite+'',
      tramite: name,
      dispositivo: this.deviceInfo.deviceType,
      navegador: this.deviceInfo.browser,
      so: this.deviceInfo.os
    }
    this.tableroService.registroTablero(registro).toPromise()
    .then(result => {
    })
    .catch(err => {
      console.error(err)
    })
  }

  accion(link: string, linkVus: boolean, name: string): void {
    this.tablero(name);
    let linkRedirect = link;

    if (linkVus) {
      linkRedirect = link + this.token;
    } else {
      linkRedirect = link;
    }

    window.open(linkRedirect, "_blank");
  }

  onResize() {

    if (window.innerWidth <= 530) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }

  }

  direccionaMientoVermas(link:string){
    window.open(link, "_blank");
  }
}
