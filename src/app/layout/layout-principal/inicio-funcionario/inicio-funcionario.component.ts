import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { TranslocoService } from '@ngneat/transloco';
import { menuMimo } from 'src/app/model/layout';

@Component({
  selector: 'app-inicio-funcionario',
  templateUrl: './inicio-funcionario.component.html',
  styleUrls: ['./inicio-funcionario.component.scss']
})
export class InicioFuncionarioComponent {
  window: Window & typeof globalThis = window;

  styleCustom: string = ""
  sytleCustomNavbar: string = "";
  mode: MatDrawerMode = "side";
  open: boolean = true;
  listaManuRolFuncionario: menuMimo[] = []

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

  constructor(private translocoService: TranslocoService
    ) {
    this.onResize();
    this.translocoService.selectTranslateObject('inicio').subscribe(value => {
      this.listaManuRolFuncionario = [
        {
          nameMenu: value.inicio,
          iconLink: "assets/icons/Home_icono.svg",
          link: "/pagesf/home",
          isSubMenu: false
        },
        {
          nameMenu: value.miPerfil,
          iconLink: "assets/icons/Perfil_icono.svg",
          link: "/pagesf/mi-perfil",
          isSubMenu: false
        },
        {
          nameMenu: value.reportes,
          iconLink: "assets/icons/Descripción trámite.svg",
          link: "/pagesf/help",
          isSubMenu: false
        },
        {
          nameMenu: value.centroAyuda,
          iconLink: "assets/icons/Centro de ayuda_icono (2).svg",
          link: "/pagesf/help",
          isSubMenu: false
        },
      ]
    })

  }
}
