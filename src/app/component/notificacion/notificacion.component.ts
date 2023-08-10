import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationConstants } from '../../core/constant/notificationConstants';
import { dataNoty } from '../../model/noty';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  icon: string = "alert-triangle";
  text: string = NotificationConstants.DEFAULT_MESSAGE;
  color: string = NotificationConstants.COLOR_DEFAULT_MESSAGE;
  title: string = NotificationConstants.DEFAULT_TITLE;
  buttonText1: string = NotificationConstants.BUTTON_TEXT_1;
  buttonText2: string = NotificationConstants.BUTTON_TEXT_2;
  iconClass: string = "icon-notificacion-size";

  constructor(
    public dialogRef: MatDialogRef<NotificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataNoty,
  ) {
    if(this.data.iconClass !== undefined){
      this.iconClass = this.data.iconClass + "";
    }

    //console.log(this.data.iconClass)
    if(this.data.text !== ""){
      this.text = this.data.text;
    }
    if (this.data.button) {
      if(this.data.buttonText1 !== undefined) {
        this.buttonText1 = this.data.buttonText1 + "";
      }
      if(this.data.buttonText2 !== undefined) {
        this.buttonText2 = this.data.buttonText2 + "";
      }
    }
    switch (this.data.type) {
      case NotificationConstants.SUCCESS:
        this.icon = NotificationConstants.ICON_SUCCESS;
        this.color = NotificationConstants.COLOR_SUCCESS;
        if(this.data.title !== ""){
          this.title = this.data.title
        } else {
          this.title = "Proceso exitoso"
        }
        break;
      case NotificationConstants.INFO:
        this.icon = NotificationConstants.ICON_INFO;
        this.color = NotificationConstants.COLOR_INFO;
        if(this.data.title !== ""){
          this.title = this.data.title
        } else {
          this.title = "Información"
        }
        break;
      case NotificationConstants.ALERT:
        this.icon = NotificationConstants.ICON_ALERT;
        this.color = NotificationConstants.COLOR_ALERT;
        if(this.data.title !== ""){
          this.title = this.data.title
        } else {
          this.title = "Alerta"
        }
        break;
      case NotificationConstants.ERROR:
        if(this.data.title !== ""){
          this.title = this.data.title
        } 
        this.icon = NotificationConstants.ICON_ERROR;
        this.color = NotificationConstants.COLOR_ERROR;
        break;
      case NotificationConstants.CUSTOM:
        this.title = this.data.title;
        if(this.data.icon !== undefined) {
          this.icon = this.data.icon + "";
        }
        if(this.data.color !== undefined) {
          this.color = this.data.color + "";
        }
        break;
    }

  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  openLink(_event: any): void {
    this.dialogRef.close(_event);
  }
}
