import { Component, OnInit, Input } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/service/session.service';
import { menuMimo } from 'src/app/model/layout';
import { Languaje } from 'src/app/model/languaje';
import { TranslocoService } from '@ngneat/transloco';
import { LanguajeService } from 'src/app/core/service/languaje.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  window: Window & typeof globalThis = window;

  styleCustom: string = ""
  sytleCustomNavbar: string = "";
  mode: MatDrawerMode = "side";
  open: boolean = true;
  textSesion: string = "";

  languajes!: Languaje[];
  selectedLanguaje!: Languaje;

  title = 'angular-i18n-transloco';
  selectLang;

  isSession: boolean;

  listaMenuFooter: menuMimo[] = []
  listaMenuRolAnonimo: menuMimo[] = []
  listaMenuRolCliente: menuMimo[] = []

  linkLogo() {
    this.router.navigateByUrl('/pages/landing-page');
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

  hidden = false;

  numeroNotificacion: number = 0;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private languajeService: LanguajeService,
    private translocoService: TranslocoService
  ) {
    //this.selectLanguage();
    this.selectLang = this.sessionService.getItemInSession(SessionConstants.LOCALE);

    this.onResize();
    this.hidden = true;

    var that = this;
    setInterval(function () {
      let cantidadTramite: string = that.sessionService.getItemLocal('cantidadTramites') + '';
      let cantidadCitas: string = that.sessionService.getItemLocal('cantidadCitas') + '';
      let cantidadComperandos: string = that.sessionService.getItemLocal('cantidadComperandos') + '';
      that.numeroNotificacion = parseInt(cantidadTramite === 'null' ? '0' : cantidadTramite)
        + parseInt(cantidadCitas === 'null' ? '0' : cantidadCitas)
        + parseInt(cantidadComperandos === 'null' ? '0' : cantidadComperandos);
      if (that.numeroNotificacion === 0) {
        that.hidden = true;
      } else {
        that.hidden = false;
      }
    }, 3000);

    if (this.sessionService.isSession()) {
      this.isSession = true;
    } else {
      this.isSession = false;
    }

    this.translocoService.selectTranslateObject('inicio').subscribe(value => {
      this.listaMenuFooter = [
        {
          nameMenu: value.inicio,
          iconLink: "assets/icons/Home_icono.svg",
          link: this.isSession ? "/pages/home" : "/pages/landing-page",
          isSubMenu: false
        },
        {
          nameMenu: value.mapas,
          iconLink: "assets/icons/Icono Ventanilla.svg",
          link: "/pages/mapas",
          isSubMenu: false
        },
        {
          nameMenu: value.apps,
          iconLink: "assets/icons/Apps recomendadas_icono.svg",
          link: "/pages/apps",
          isSubMenu: false
        },
        {
          nameMenu: value.ayuda,
          iconLink: "assets/icons/Centro_de_ayuda_icono.svg",
          link: "/pages/help",
          isSubMenu: false
        },
        {
          nameMenu: this.isSession ? "Salir" : value.ingreso,
          iconLink: this.isSession ? "assets/icons/Cerrar sesión_icono.svg" : "assets/icons/Perfil_icono.svg",
          link: this.isSession ? "" : "/signin",
          isSubMenu: false
        }
      ]

      this.listaMenuRolAnonimo = [
        {
          nameMenu: value.inicio,
          iconLink: "assets/icons/Home_icono.svg",
          link: "/pages/landing-page",
          isSubMenu: false
        },
        {
          nameMenu: value.asesoriasyconsultas,
          iconLink: "assets/icons/Asesorías y consultas_icono.svg",
          link: "/pages/asesorias",
          isSubMenu: false
        },
        {
          nameMenu: value.mapasBogota,
          iconLink: "assets/icons/Icono Ventanilla.svg",
          link: "/pages/mapas",
          isSubMenu: false
        },
        {
          nameMenu: value.appsRecomendadas,
          iconLink: "assets/icons/Apps recomendadas_icono.svg",
          link: "/pages/apps",
          isSubMenu: false
        },
        {
          nameMenu: value.centroAyuda,
          iconLink: "assets/icons/Centro_de_ayuda_icono.svg",
          link: "/pages/help",
          isSubMenu: false
        },
      ];

      this.listaMenuRolCliente = [
        {
          nameMenu: value.inicio,
          iconLink: "assets/icons/Home_icono.svg",
          link: "/pages/home",
          isSubMenu: false
        },
        {
          nameMenu: value.miPerfil,
          iconLink: "assets/icons/Perfil_icono.svg",
          link: "/pages/mi-perfil",
          isSubMenu: true,
          subMenu: [
            {
              nameMenu: value.actualizacionDatos,
              iconLink: "",
              link: "/pages/mi-perfil",
              isSubMenu: false,
            },
            {
              nameMenu: value.firmaElectronica,
              iconLink: "",
              link: "/pages/firma-electronica",
              isSubMenu: false
            },
            {
              nameMenu: value.notificacion,
              iconLink: "",
              link: "/pages/notificacion-electronica",
              isSubMenu: false
            },
          ]
        },
        {
          nameMenu: value.misCitas,
          iconLink: "assets/icons/Citas_icono_home.svg",
          link: "/pages/mis-citas",
          isSubMenu: false
        },
        {
          nameMenu: value.tramitesyservicios,
          iconLink: "assets/icons/Trámites_icono.svg",
          link: "/pages/tramites",
          isSubMenu: true,
          subMenu: [
            {
              nameMenu: value.tramites,
              iconLink: "",
              link: "/pages/tramites",
              isSubMenu: false,
            },
            {
              nameMenu: value.comparendos,
              iconLink: "",
              link: "/pages/comparendos",
              isSubMenu: false
            },
            {
              nameMenu: value.inmovilizaciones,
              iconLink: "",
              link: "/pages/inmovilizaciones",
              isSubMenu: false
            },
            {
              nameMenu: value.asesoriasyconsultas,
              iconLink: "",
              link: "/pages/asesorias",
              isSubMenu: false
            },
          ]
        },
        {
          nameMenu: value.mapasBogota,
          iconLink: "assets/icons/Icono Ventanilla.svg",
          link: "/pages/mapas",
          isSubMenu: false
        },
        {
          nameMenu: value.appsRecomendadas,
          iconLink: "assets/icons/Apps recomendadas_icono.svg",
          link: "/pages/apps",
          isSubMenu: false
        },
        {
          nameMenu: value.centroAyuda,
          iconLink: "assets/icons/Centro_de_ayuda_icono.svg",
          link: "/pages/help",
          isSubMenu: false
        },
      ]

      if (this.isSession == true) {
        this.textSesion = "Cerrar sesión";
        //console.log(this.textSesion)
      } else {
        this.textSesion = "Iniciar sesión";
      }

    });

  }

  cerrarSession() {
    this.sessionService.notiCierreSession();
  }

  private loadScriptChatbot() {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.async = true;
    chatScript.src = 'https://webchat-cls45-dal.i6.inconcertcc.com/v3/click_to_chat?token=9EB4BD8DB699F4781504C26A8F373990';
    document.body.appendChild(chatScript);
  }

  selectLanguage(language: string | null = this.selectLang) {
    if( language === 'es' ){
      this.selectLang = 'en'
      language = 'en'
      this.sessionService.setItemInSession(SessionConstants.LOCALE, 'en');
    } else {
      language = 'es'
      this.selectLang = 'es'
      this.sessionService.setItemInSession(SessionConstants.LOCALE, 'es');
    }
    this.translocoService.setActiveLang(language !== null? language : 'es');
  }

  ngOnInit(): void {
    this.languajeService.getAllLanguajes().subscribe({
      next: (values: Languaje[]) => {
        this.languajes = values;
      }
    });
    const activeLanguaje = this.languajeService.getLanguajeByCode(this.translocoService.getActiveLang());
    this.selectedLanguaje = (activeLanguaje !== null) ? activeLanguaje : this.languajeService.getDefaultLanguaje();
    this.loadScriptChatbot();
  }

  changeSiteLanguaje(languajeEvent: any) {
    this.translocoService.setActiveLang(languajeEvent.value.code)
  }

}
