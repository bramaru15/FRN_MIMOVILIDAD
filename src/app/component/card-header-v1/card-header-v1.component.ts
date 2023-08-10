import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { buttonLink } from 'src/app/model/cardTramite';

@Component({
  selector: 'app-card-header-v1',
  templateUrl: './card-header-v1.component.html',
  styleUrls: ['./card-header-v1.component.scss']
})
export class CardHeaderV1Component implements OnInit {
  @Input() proceso: boolean = true;

  icono: SafeHtml = "";
  safehtmlStr:SafeHtml = "";
  
  @Input() listButton: buttonLink = {
    name: "",
    link: "",
    linkVus:false,
    subText: "",
    linkIcon: "",
    direciona: false
  }

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    let text = this.listButton.subText + ''
    this.safehtmlStr=this.sanitizer.bypassSecurityTrustHtml(text);
    this.http.get(this.listButton.linkIcon, { responseType: 'text' })
      .subscribe(svg => {
        this.icono = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }
}
