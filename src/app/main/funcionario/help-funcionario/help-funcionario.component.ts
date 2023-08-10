import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { SessionService } from 'src/app/core/service/session.service';
import { menuMimo } from 'src/app/model/layout';
import { listaManuRolFuncionario, listaManuRolFuncionarioEn } from 'src/app/model/menuFuncionario';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-help-funcionario',
  templateUrl: './help-funcionario.component.html',
  styleUrls: ['./help-funcionario.component.scss']
})
export class HelpFuncionarioComponent  implements OnInit {

  proceso: boolean = true;

  ngOnInit(): void {
    var that = this;
    setTimeout(function(){
      that.proceso = false;
    },1000);
  }

  environment: any = environment;

  window: Window & typeof globalThis = window;

  listaManuRolFuncionario: menuMimo[];

  styleCustom: string = ""
  sytleCustomNavbar: string = "";
  mode: MatDrawerMode = "side";
  open: boolean = true;

  sytleCustomOnDrawer: string = "";

  ngDoCheck(){
    if(this.sessionService.getItemInSession(SessionConstants.LOCALE) === 'en'){
      this.listaManuRolFuncionario = listaManuRolFuncionarioEn
    } else {
      this.listaManuRolFuncionario = listaManuRolFuncionario
    }
  }

  constructor(private sessionService: SessionService){
    this.onResize();
    if(this.sessionService.getItemInSession(SessionConstants.LOCALE) === 'en'){
      this.listaManuRolFuncionario = listaManuRolFuncionarioEn
    } else {
      this.listaManuRolFuncionario = listaManuRolFuncionario
    }
  }

  onResize() {

    if (window.innerWidth >= 1300) {
      this.sytleCustomNavbar = "";
      this.styleCustom = "display: none;";
      this.mode = "side";
      this.open = true;
    } else {
      this.sytleCustomNavbar = "display: none;";
      this.styleCustom = "";
      this.mode = "over";
      this.open = false;
    }
  }

}
