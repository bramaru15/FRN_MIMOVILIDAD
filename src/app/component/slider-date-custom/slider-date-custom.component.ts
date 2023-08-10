import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-slider-date-custom',
  templateUrl: './slider-date-custom.component.html',
  styleUrls: ['./slider-date-custom.component.scss']
})
export class SliderDateCustomComponent {
  @Input() fechaI: string = "01/03/2023";
  @Input() fechaF: string = "10/03/2023";
  @Input() title: string = ""
  @Input() proceso: boolean = true;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() icono: string = "";

  window: Window & typeof globalThis = window;

  eventoClick($event :any){
    this.messageEvent.emit($event);
  }

  momentCustom(_any: any, format: string) : string {
    return moment(_any).format(format).toString()
  }
}
