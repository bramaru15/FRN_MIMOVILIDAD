import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { TableroService } from 'src/app/core/service/tablero.service';
import { dataCardTramite } from 'src/app/model/cardTramite';
import { registroTablero } from 'src/app/model/tablero';

@Component({
  selector: 'app-card-centro-ayuda',
  templateUrl: './card-centro-ayuda.component.html',
  styleUrls: ['./card-centro-ayuda.component.scss']
})
export class CardCentroAyudaComponent {
  safehtmlStr:SafeHtml = "";
  deviceInfo: any;

  @Input() imgLink: string = ""
  @Input() title: string = ""
  @Input() text: string = ""
  @Input() textBoton: string = ""
  @Input() proceso: boolean = false;
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

  constructor(public dom:DomSanitizer,private http: HttpClient,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private router: Router) {
      this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  
  ngOnInit(): void {
    this.safehtmlStr=this.dom.bypassSecurityTrustHtml(this.text);
  }


  accion(link: string, name: string): void {
    
      this.tablero(name);
      window.open(link, "_blank");
     
  }

  tablero(name: string): void {
    let registro: registroTablero = {
      tipo: TipoReporte.TRAMITE,
      categoria: '',
      tipoTramite: '',
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
  
}
