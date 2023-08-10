import { Component, Input } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { lang } from 'moment';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { LanguajeService } from 'src/app/core/service/languaje.service';
import { LoginService } from 'src/app/core/service/login.service';
import { SessionService } from 'src/app/core/service/session.service';
import { Languaje } from 'src/app/model/languaje';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  usuario: any = "USUARIO";
  languajes!: Languaje[];
  selectedLanguaje!: Languaje;
  @Input() isHome: boolean = true;

  @Input() selectLang;

  isSession: boolean;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private languajeService: LanguajeService,
    private translocoService: TranslocoService
  ) {
    this.selectLang = this.sessionService.getItemInSession(SessionConstants.LOCALE);
    if (this.sessionService.isSession()) {
      this.isSession = true;
    } else {
      this.isSession = false;
    }
    if (this.sessionService.getItem(SessionConstants.USER_NAME) !== null) {
      this.usuario = this.sessionService.getItem(SessionConstants.USER_NAME);
    }
  }
  ngOnInit():void{
    this.languajeService.getAllLanguajes().subscribe({
      next: (values:Languaje[])=>{
        this.languajes = values;
      }
    });
    const activeLanguaje = this.languajeService.getLanguajeByCode(this.translocoService.getActiveLang());
    this.selectedLanguaje = (activeLanguaje !== null)?activeLanguaje : this.languajeService.getDefaultLanguaje();
  }

  changeSiteLanguaje(languajeEvent: any){
    this.translocoService.setActiveLang(languajeEvent.value.code)
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

  minString(text: string): string {
    return text.toLowerCase();
  }

  accionLink() {
    this.router.navigateByUrl('/pages/mi-perfil');
  }

  cerrarsession() {
    this.sessionService.notiCierreSession();
    //window.open('/pages/landing-page');
  }

  iniciarsesion() {
    this.sessionService.clearAll();
    this.router.navigateByUrl('/signin');
  }
}
