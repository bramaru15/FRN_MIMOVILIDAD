import { Component,Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationConstants } from 'src/app/core/constant/notificationConstants';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { dataNoty } from 'src/app/model/noty';
import { DetalleTaxiService } from 'src/app/core/service/detalle.taxis.service';
import { taxis } from 'src/app/model/taxis';

@Component({
  selector: 'app-detalle-conductores-taxi',
  templateUrl: './detalle-conductores-taxi.component.html',
  styleUrls: ['./detalle-conductores-taxi.component.scss']
})
export class DetalleConductoresTaxiComponent {
  color: string = NotificationConstants.COLOR_SUCCESS;
  fechaVencimiento = new Date();
  fechaVencimientoRtm = new Date();
  fechaVencimientoSOAT = new Date();
  fechaVencimientoTO = new Date();
  @Input() imgLink: string = ""
  taxi!: taxis;
  constructor(
    public dialogRef: MatDialogRef<DetalleConductoresTaxiComponent>,
    public detalleService:DetalleTaxiService,
    @Inject(MAT_DIALOG_DATA) public data: taxis[]
  ){
    this.taxi=this.data[0];
    ////console.log(this.taxi)
    this.fechaVencimiento = new Date(this.taxi.fechaValidez);
    this.fechaVencimientoRtm = new Date(this.taxi.fechaVencimientoRtm);
    this.fechaVencimientoSOAT = new Date(this.fechaVencimientoSOAT);
    this.fechaVencimientoTO = new Date(this.fechaVencimientoTO);
  }

  

  openLink(_event: any): void {
    this.dialogRef.close(_event);
  }
}
