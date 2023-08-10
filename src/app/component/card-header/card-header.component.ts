import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {

  safehtmlStr:SafeHtml = "";

  window: Window & typeof globalThis = window;

  
  @Input() imgLink: string = ""
  @Input() title: string = ""
  @Input() text: string = "";
  @Input() proceso: boolean = true;
  @Input() styleImg: string | undefined;
  @Input() styleTitle: string | undefined;
  

  constructor(private sanitizer: DomSanitizer,) {
    //this.safehtmlStr=this.text;
    //console.log(this.dataCardHeader.text);
    //console.log(this.dataCardHeader.title);
  }

  selectionDispositivo($event: any){
    //console.log($event)
  }

  ngOnChanges(){
    //console.log(this.dataCardHeader.text);
    //console.log(this.dataCardHeader.title);
    let text = this.text + ''
    this.safehtmlStr = this.sanitizer.bypassSecurityTrustHtml(text);
  }

  ngOnInit(): void {
    //this.safehtmlStr=this.dom.bypassSecurityTrustHtml(this.dataCardHeader.text);
    //console.log(this.dataCardHeader.text);
    //console.log(this.dataCardHeader.title);
    let text = this.text + ''
    this.safehtmlStr = this.sanitizer.bypassSecurityTrustHtml(text);
    //this.safehtmlStr=this.text;
  }
}
