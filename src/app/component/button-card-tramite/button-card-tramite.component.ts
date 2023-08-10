import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationConstants } from 'src/app/core/constant/notificationConstants';
import { NotificacionService } from 'src/app/core/service/notificacion.service';
import { buttonCardTramite, ifecha } from 'src/app/model/cardTramite';
import * as ics from 'ics'
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-button-card-tramite',
  templateUrl: './button-card-tramite.component.html',
  styleUrls: ['./button-card-tramite.component.scss']
})
export class ButtonCardTramiteComponent {

  constructor(
    private notificacionService: NotificacionService,
    private translocoService : TranslocoService,
    private router: Router) {
  }

  @Input() buttonCardTramite: buttonCardTramite = {
    type: 'fecha',
    name: '',
    estadoButton: false
  };

  accion(type: string) {
    if (this.buttonCardTramite.estadoButton) {
      if (this.buttonCardTramite.linkUbicacion) {
        if (type === 'ubicacion') {
          window.open(this.buttonCardTramite.linkUbicacion, "_blank");
        }
      }

      if (this.buttonCardTramite.icalendar) {
        if (type === 'agenda') {
          this.notificacionService.custom(
            {
              type: 'custom',
              title: this.translocoService.translate('notificaciones.buttonCard.title'),
              text: this.translocoService.translate('notificaciones.buttonCard.text'),
              button: true,
              color: NotificationConstants.COLOR_ALERT,
              icon: NotificationConstants.ICON_INFO
            }
          ).afterClosed().subscribe(result => {
            if (result) {
              const _eventDate: ifecha = {
                year: 0,
                month: 0,
                minute: 0,
                hour: 0,
                date: 0
              }

              const eventDate: ifecha = this.buttonCardTramite.icalendar? this.buttonCardTramite.icalendar.fecha : _eventDate;

              const event: ics.EventAttributes = {
                start: [eventDate.year, eventDate.month, eventDate.date, eventDate.hour, eventDate.minute],
                duration: { hours: 0, minutes: 30 },
                title: this.buttonCardTramite.icalendar?.summary,
                description: this.buttonCardTramite.icalendar?.description,
                location: this.buttonCardTramite.icalendar?.location,
              }

              ics.createEvent(event, (error: any, value: any) => {
                if (error) {
                  this.notificacionService.error("", this.translocoService.translate('notificaciones.buttonCard.error'));
                  return
                }
                const downloadLink = document.createElement('a');
                downloadLink.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(value));
                downloadLink.setAttribute('download', 'mi-cita.ics');
                document.body.appendChild(downloadLink);
                downloadLink.click();
              })
            }
          });
        }
      }
    }
  }
}
