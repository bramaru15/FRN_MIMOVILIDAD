import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/service/session.service';

@Component({
  selector: 'app-button-notificacion',
  templateUrl: './button-notificacion.component.html',
  styleUrls: ['./button-notificacion.component.sass']
})
export class ButtonNotificacionComponent {
  hidden = false;

  numeroNotificacion: number = 0;

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {
    if(this.numeroNotificacion === 0) {
      this.hidden = true;
    }
    var that = this;
    setInterval(function(){
      let cantidadTramite: string  =  that.sessionService.getItemLocal('cantidadTramites')+'';
      let cantidadCitas: string  =  that.sessionService.getItemLocal('cantidadCitas')+'';
      let cantidadComperandos: string  =  that.sessionService.getItemLocal('cantidadComperandos')+'';
      let cantidadInmovilizacion: string  =  that.sessionService.getItemLocal('cantidadInmovilizacion')+'';
      
      that.numeroNotificacion = parseInt(cantidadTramite === 'null'? '0': cantidadTramite)
                                +parseInt(cantidadCitas === 'null'? '0': cantidadCitas)
                                +parseInt(cantidadComperandos === 'null'? '0': cantidadComperandos)
                                +parseInt(cantidadInmovilizacion === 'null'? '0': cantidadInmovilizacion);
      that.hidden = false;
    },3000);
  }

  toggleBadgeVisibility() {
    this.router.navigateByUrl('/pages/home');
  }
}
