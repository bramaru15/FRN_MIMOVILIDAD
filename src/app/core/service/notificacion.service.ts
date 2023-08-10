import { Injectable } from '@angular/core';
import { NotificacionComponent } from '../../component/notificacion/notificacion.component';
import { NotificationConstants } from '../../core/constant/notificationConstants';
import { MatDialog } from '@angular/material/dialog';
import { dataNoty } from '../../model/noty';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(public dialog: MatDialog) { }

  custom(data: dataNoty) {
    const dialogRef = this.dialog.open(NotificacionComponent, {
      data: {
        type: NotificationConstants.CUSTOM,
        text: data.text,
        title: data.title,
        button: data.button,
        icon: data.icon,
        color: data.color,
        buttonText1: data.buttonText1,
        buttonText2: data.buttonText2,
        iconClass: data.iconClass
      }
    });
    return dialogRef;
  }

  success(title: string, text: string) {
    const dialogRef = this.dialog.open(NotificacionComponent, {
      data: {
        type: NotificationConstants.SUCCESS,
        text: text,
        title: title,
        button: false,
      }
    });
    return dialogRef;
  }

  error(title: string, text: string) {
    //console.log(title,text);
    const dialogRef = this.dialog.open(NotificacionComponent, {
      data: {
        type: NotificationConstants.ERROR,
        text,
        title: title,
        button: false,
      }
    });
    return dialogRef;
  }

  info(title: string, text: string) {
    const dialogRef = this.dialog.open(NotificacionComponent, {
      data: {
        type: NotificationConstants.INFO,
        text: text,
        title: title,
        button: false,
      }
    });
    return dialogRef;
  }

  alert(title: string, text: string, btn?: boolean) {
    const dialogRef = this.dialog.open(NotificacionComponent, {
      data: {
        type: NotificationConstants.ALERT,
        text: text,
        title: title,
        button: btn === undefined? false : btn,
      }
    });
    return dialogRef;
  }
}
