import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-mensaje-grafica',
  templateUrl: './mensaje-grafica.component.html',
  styleUrls: ['./mensaje-grafica.component.scss']
})
export class MensajeGraficaComponent {
  @Input() icon: string = "";
  @Input() mensaje: string = "";
}
