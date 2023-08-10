import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { buttonLink } from 'src/app/model/cardTramite';
import { registroTablero } from 'src/app/model/tablero';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TableroService } from 'src/app/core/service/tablero.service';
import { SessionService } from 'src/app/core/service/session.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { TipoReporte } from 'src/app/core/constant/Tableros';

@Component({
  selector: 'app-card-button-link-subtramite',
  templateUrl: './card-button-link-subtramite.component.html',
  styleUrls: ['./card-button-link-subtramite.component.scss']
})
export class CardButtonLinkSubtramiteComponent {
  icono: SafeHtml = "";

  token: string | null = '';
  deviceInfo: any;

  @Input() listButton: buttonLink = {
    name: "",
    link: "",
    linkVus:false,
    linkIcon: "",
    direciona: false
  }

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private sessionService: SessionService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  ngOnInit(): void {
    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN);
    //console.log("TOKEN ="+this.token);

    this.http.get(this.listButton.linkIcon, { responseType: 'text' })
      .subscribe(svg => {
        this.icono = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }

  tablero(name: string): void {
    let registro: registroTablero = {
      tipo: TipoReporte.TRAMITE,
      categoria: this.listButton.categoria+'',
      tipoTramite: this.listButton.tipo_tramite+'',
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

  accion(link: string, linkVus:boolean, name: string): void {
    //console.log("button-link-3");
    //console.log("token="+this.token);
    //console.log("link="+link);
    let linkRedirect;
    if (this.listButton.direciona) {
      if (linkVus){
        linkRedirect = link+this.token;
      }else{
        linkRedirect = link;
      }

      this.tablero(name);
      window.open(linkRedirect, "_blank");
    } else {
      this.router.navigateByUrl(link);
    }
  }
}
