import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { SessionService } from 'src/app/core/service/session.service';
import { menuMimo } from 'src/app/model/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  window: Window & typeof globalThis = window;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  panelOpenState = false;

  hide: boolean = true;

  styleCustom: string = '';

  isSession: boolean;
  
  menuAbierto: {name: string; value: boolean}[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {
    if (this.sessionService.isSession()) {
      this.isSession = true;
    } else {
      this.isSession = false;
    }
  }

  @Input() drawer?: MatDrawer;

  @Input() funcionarioIs?: boolean = true;

  @Input() listaMenu: menuMimo[] = [
    { 
      nameMenu: "",
      iconLink: "",
      link: "",
      isSubMenu: false
    }
  ]

  closeAll(){
    this.accordion.closeAll();
  }

  openClose(item: string): boolean{
    //console.log(item);
    let aux = this.menuAbierto.filter(x => x.name === item);
    if(aux.length === 0){
      return false;
    } else {
      return aux[0].value;
    }
  }

  onPanelOpened(item:string) {
    let aux = this.menuAbierto.filter(x => x.name === item);
    if(aux.length === 0){
      this.menuAbierto.push({name:item, value:true})
    } else {
      this.menuAbierto[this.menuAbierto.indexOf(aux[0])].value = true
    }
    this.styleCustom = 'activa-panel-manu';
  }

  onPanelClosed(item:string) {
    let aux = this.menuAbierto.filter(x => x.name === item);
    if(aux.length === 0){
      this.menuAbierto.push({name:item, value:false})
    } else {
      this.menuAbierto[this.menuAbierto.indexOf(aux[0])].value = false
    }
    this.styleCustom = '';
  }
  
  closed() {
    if(window.innerWidth < 1300) {
      this.drawer?.toggle()
    }
  }

  /*ngDoCheck(){
    console.log(window.navigator)
  }*/

  linkLogo() {
    this.router.navigateByUrl('/pages/landing-page');
  }

  cerrarsession() {
    this.sessionService.notiCierreSession();
  }

  iniciarsesion() {
    this.sessionService.clearAll();
    this.router.navigateByUrl('/signin');
  }
}
