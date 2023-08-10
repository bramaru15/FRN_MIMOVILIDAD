import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { SessionService } from 'src/app/core/service/session.service';
import { TableroService } from 'src/app/core/service/tablero.service';
import { buttonLink } from 'src/app/model/cardTramite';
import { registroTablero } from 'src/app/model/tablero';

@Component({
  selector: 'app-card-header-v4',
  templateUrl: './card-header-v4.component.html',
  styleUrls: ['./card-header-v4.component.scss']
})
export class CardHeaderV4Component {
  @Input() proceso: boolean = true;

  icono: SafeHtml = "";
  safehtmlStr:SafeHtml = "";

  deviceInfo: any;
  
  @Input() listButton: buttonLink = {
    name: "",
    link: "",
    linkVus:false,
    subText: "",
    linkIcon: "",
    direciona: false
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private sessionService: SessionService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
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

  ngOnInit(): void {
    let text = this.listButton.subText + ''
    this.safehtmlStr=this.sanitizer.bypassSecurityTrustHtml(text);
    this.http.get(this.listButton.linkIcon, { responseType: 'text' })
      .subscribe(svg => {
        this.icono = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }

  accion(link: string, direciona: boolean, name: string): void {
    if (direciona) {
      if (!(navigator.onLine)) {
        this.sessionService.offline();
      } else {
        this.tablero(name);
        window.open(link, "_blank");
      }
    } else {
      this.router.navigateByUrl(link);
    }
  }
}
