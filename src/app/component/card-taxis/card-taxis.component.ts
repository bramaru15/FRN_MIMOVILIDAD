import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DetalleTaxiService } from 'src/app/core/service/detalle.taxis.service';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { TableroService } from 'src/app/core/service/tablero.service';
import { dataCardTramite } from 'src/app/model/cardTramite';
import * as moment from 'moment';
import { registroTablero } from 'src/app/model/tablero';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-card-taxis',
  templateUrl: './card-taxis.component.html',
  styleUrls: ['./card-taxis.component.scss']
})
export class CardTaxisComponent implements OnInit {
  deviceInfo: any;
  safehtmlStr: SafeHtml = "";
  fecha = new Date();
  conductorSeleccionado = new SelectionModel<any>(true, []);
  @Input() imgLink: string = ""
  @Input() cambioTexto: boolean = false;
  @Input() title: string = ""
  @Input() text: string = ""
  @Input() textBoton: string = ""
  @Input() proceso: boolean = false;
  @Input() placa: any = "";
  @Input() resultadoBusquedaInmovilizacion: boolean = false;
  @Input() listadoConductores: any[] = [];
  @Input() resultadoBusqueda: boolean = false;
  @Input() tipoResiltado: 'inmovilizacion' | 'placa' | 'tarjetaOperation' | 'exceptuado' = 'placa'
  @Input() linkVermas: string = "";
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

  conductores: any[] = [];

  constructor(public dom: DomSanitizer, private http: HttpClient,
    private sanitizer: DomSanitizer,
    private notificacionService: NotificacionService,
    private detalleService: DetalleTaxiService,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private router: Router,
    private translocoService: TranslocoService) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  /*ngOnChanges(changes: SimpleChanges): void {
    this.safehtmlStr = this.dom.bypassSecurityTrustHtml(this.text);
    if (changes['tipoResiltado'] && changes['tipoResiltado'].currentValue) {
      if (!this.cambioTexto) {
        this.safehtmlStr = "El vehículo de placa "+this.placa+" no se encuentra inmovilizado en el patio  Álamos TRANSV.93 # 53-35"
      }
    }
  }*/

  ngOnInit(): void {
    this.safehtmlStr = this.dom.bypassSecurityTrustHtml(this.text);
    if (!this.resultadoBusqueda) {
      //console.log(this.tipoResiltado)
      this.translocoService.selectTranslateObject('cardTaxis').subscribe(value => {
        if (this.tipoResiltado === 'placa') {
          this.safehtmlStr = value.placa.mensajeUno + this.placa + value.placa.mensajeDos + moment(this.fecha).format("DD-MM-YYYY hh:mm:ss") + value.placa.mensajeTres
        } else if (this.tipoResiltado === 'tarjetaOperation') {
          this.safehtmlStr = value.tarjetaOperation.mensajeUno + this.placa + value.tarjetaOperation.mensajeDos + moment(this.fecha).format("DD-MM-YYYY hh:mm:ss") + value.tarjetaOperation.mensajeTres
        } else if (this.tipoResiltado === 'exceptuado') {
          this.safehtmlStr = value.exceptuado
        } else if (this.tipoResiltado === 'inmovilizacion') {
          this.safehtmlStr = value.inmovilizacion.mensajeUno + this.placa + value.inmovilizacion.mensajeDos
        }
      })

    }
  }


  openDialog() {
    if (this.tipoResiltado !== 'exceptuado') {
      this.detalleService.openDialog(this.conductorSeleccionado.selected);
    } else {
      this.detalleService.openDialogExceptuado(this.listadoConductores[0][0]);
    }

  }

  selectionConductor(_event: any) {
    this.conductorSeleccionado = _event;
  }

  direccionaMientoVermas() {
    this.tablero();
    window.open(this.linkVermas, "_blank");
  }


  tablero(): void {
    let registro: registroTablero = {
      tipo: TipoReporte.TRAMITE,
      categoria: 'Asesorías y consultas',
      tipoTramite: this.tipoResiltado === 'exceptuado' ? 'Vehículos exceptuados' : 'Consulta de Taxis',
      tramite: 'Ver más',
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
