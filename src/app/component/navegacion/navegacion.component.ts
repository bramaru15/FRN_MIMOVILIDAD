import { Component, Input, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit, AfterViewInit {
  @Input() width: string = "";
  @Input() height: string = "";

  constructor(private location: Location, private router: Router) { }

  onUrlChange(event?: any) {
    //console.log(window.location)
    if(window.location.hash !== '#/pages/home' && window.location.hash !== '#/pages/landing-page'){
      return false
    } else {
      return true
    }
  }

  onUrlChange2(event?: any) {
    let obWin:any = window
    //console.log(obWin.navigation.canGoForward)
    return !(obWin.navigation.canGoForward)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  goBack() {
    if(window.location.hash !== '#/pages/home' && window.location.hash !== '#/pages/landing-page'){
      this.location.back();
    }
  }
  
  goForward() {
    this.location.forward();
  }
}
