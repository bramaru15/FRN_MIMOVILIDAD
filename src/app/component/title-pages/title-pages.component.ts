import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-title-pages',
  templateUrl: './title-pages.component.html',
  styleUrls: ['./title-pages.component.scss']
})
export class TitlePagesComponent {

  safehtmlStr:SafeHtml = "";

  @Input() title: string = ""
  @Input() text: string = ""

  constructor(public dom:DomSanitizer,) {
  }

  ngOnChanges() {
    this.safehtmlStr=this.dom.bypassSecurityTrustHtml(this.text);
  }
  
  ngOnInit(): void {
    this.safehtmlStr=this.dom.bypassSecurityTrustHtml(this.text);
  }

}
