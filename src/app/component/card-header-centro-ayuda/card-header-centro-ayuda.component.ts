import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card-header-centro-ayuda',
  templateUrl: './card-header-centro-ayuda.component.html',
  styleUrls: ['./card-header-centro-ayuda.component.scss']
})
export class CardHeaderCentroAyudaComponent implements OnInit {
  safehtmlStr:SafeHtml = "";
  safehtmlStr2:SafeHtml = "";
  safehtmlStr3:SafeHtml = "";
  icono: SafeHtml = "";

  @Input() imgLink: string = ""
  @Input() imgLink2: string = ""
  @Input() title: string = ""
  @Input() title2: string = ""
  @Input() text: string = ""
  @Input() text2: string =""
  @Input() text3: string =""
  @Input() linkTelefo: string =""
  @Input() linkCorreo: string =""
  @Input() proceso: boolean = false;

  constructor(public dom:DomSanitizer,private sanitizer: DomSanitizer,private http: HttpClient){}

  ngOnChanges(){
    this.safehtmlStr=this.dom.bypassSecurityTrustHtml(this.text);
    this.safehtmlStr2=this.dom.bypassSecurityTrustHtml(this.text2);
    this.safehtmlStr3=this.dom.bypassSecurityTrustHtml(this.text3);
  }
  
  ngOnInit(): void {
    this.safehtmlStr=this.dom.bypassSecurityTrustHtml(this.text);
    this.safehtmlStr2=this.dom.bypassSecurityTrustHtml(this.text2);
    this.safehtmlStr3=this.dom.bypassSecurityTrustHtml(this.text3);

    /*this.http.get(this.imgLink, { responseType: 'text' })
      .subscribe(svg => {
        this.icono = this.sanitizer.bypassSecurityTrustHtml(svg);
      });*/
    
  }



}

