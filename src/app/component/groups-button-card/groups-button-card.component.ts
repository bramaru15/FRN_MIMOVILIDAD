import { Component, Input, OnInit } from '@angular/core';
import { buttonLink } from 'src/app/model/cardTramite';

@Component({
  selector: 'app-groups-button-card',
  templateUrl: './groups-button-card.component.html',
  styleUrls: ['./groups-button-card.component.sass']
})
export class GroupsButtonCardComponent implements OnInit   {
  breakpoint: number = 3;

  window: Window & typeof globalThis = window;

  @Input() proceso: boolean = true;

  @Input() listButton :buttonLink[] = [
    {
      name: "",
      link: "",
      linkIcon: "",
      linkVus:false,
      direciona: false
    }
  ]

  constructor(
  ) {
    this.onResize();
  }

  ngOnInit(): void {
  }

  onResize() {

    if (window.innerWidth <= 530) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }

  }
}
