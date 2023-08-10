import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { buttonTableroHome } from 'src/app/model/tablero';

@Component({
  selector: 'app-group-button-tablaro-home',
  templateUrl: './group-button-tablaro-home.component.html',
  styleUrls: ['./group-button-tablaro-home.component.scss']
})
export class GroupButtonTablaroHomeComponent implements OnInit {

  breakpoint: number = 4;

  window: Window & typeof globalThis = window;

  @Input() proceso: boolean = true;

  @Output() messageEvent = new EventEmitter<any>();

  @Input() listButton :buttonTableroHome[] = [
    {
      name: "",
      link: "",
      linkIcon: "",
      cantidad: 0
    }
  ]

  constructor(
    ) {
      this.onResize();
    }
  

  ngOnInit(): void {
  }

  clickLink(){
    this.messageEvent.emit(event);
  }

  onResize() {

    if (window.innerWidth <= 530) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 4;
    }

  }

}
