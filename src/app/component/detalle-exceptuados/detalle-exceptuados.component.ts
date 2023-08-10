import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationConstants } from 'src/app/core/constant/notificationConstants';


@Component({
  selector: 'app-detalle-exceptuados',
  templateUrl: './detalle-exceptuados.component.html',
  styleUrls: ['./detalle-exceptuados.component.scss']
})
export class DetalleExceptuadosComponent {

  window: Window & typeof globalThis = window;
  
  color: string = NotificationConstants.COLOR_SUCCESS;
  @Input() imgLink: string = ""

  constructor(
    public dialogRef: MatDialogRef<DetalleExceptuadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  openLink(_event: any): void {
    this.dialogRef.close(_event);
  }
}
