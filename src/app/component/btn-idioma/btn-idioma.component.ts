import { Component, Input} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { SessionService } from 'src/app/core/service/session.service';

@Component({
  selector: 'app-btn-idioma',
  templateUrl: './btn-idioma.component.html',
  styleUrls: ['./btn-idioma.component.sass']
})
export class BtnIdiomaComponent {

  @Input() isAccesibilidad: boolean = false;

  window: Window & typeof globalThis = window;

  selectLang;

  constructor( private translocoService: TranslocoService, private sessionService: SessionService){
    this.selectLang = this.sessionService.getItemInSession(SessionConstants.LOCALE);
  }

  ngDoCheck(){
    this.selectLang = this.sessionService.getItemInSession(SessionConstants.LOCALE);
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
    //this.translocoService.setActiveLang(language !== null? language : 'es');
    window.location.reload();
  }
}
