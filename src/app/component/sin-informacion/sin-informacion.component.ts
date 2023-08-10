import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-sin-informacion',
  templateUrl: './sin-informacion.component.html',
  styleUrls: ['./sin-informacion.component.scss']
})
export class SinInformacionComponent {
  proceso:boolean=false;

  @Input() text:string="";
}
