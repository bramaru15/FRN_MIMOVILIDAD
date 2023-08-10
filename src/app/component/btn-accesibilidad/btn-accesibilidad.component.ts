import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-accesibilidad',
  templateUrl: './btn-accesibilidad.component.html',
  styleUrls: ['./btn-accesibilidad.component.scss']
})
export class BtnAccesibilidadComponent {
  @Input() accesibilidad: string = "";
  @Input() proceso: boolean = true;
  @Input() icon: string = "";
  @Input() styleIcon: string = "";
  @Input() classIcon: string = "";
  @Input() name: string = "";
  @Input() estadoBtn: string = "";
  @Input() styleBtn: string = "";

  @Output() custonEvento = new EventEmitter<string>();

  custonClick(name: string){
    this.custonEvento.emit(name);
  }

}
