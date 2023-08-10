import { Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon-menu',
  templateUrl: './icon-menu.component.html',
  styleUrls: ['./icon-menu.component.sass']
})
export class IconMenuComponent  implements OnInit  {
  iconoVer: SafeHtml = "";

  @Input() icon: string = "";

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    
  }

  ngOnInit(): void {
    this.http.get(this.icon, { responseType: 'text' })
    .subscribe(svg => {
      this.iconoVer = this.sanitizer.bypassSecurityTrustHtml(svg);
    });
  }
}
