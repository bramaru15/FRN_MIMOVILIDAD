import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { buttonTableroHome } from 'src/app/model/tablero';

@Component({
  selector: 'app-card-button-tablaro-home',
  templateUrl: './card-button-tablaro-home.component.html',
  styleUrls: ['./card-button-tablaro-home.component.scss']
})
export class CardButtonTablaroHomeComponent implements OnInit {

  formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  @Output() messageEvent = new EventEmitter<any>();

  icono: SafeHtml = "";

  @Input() proceso: boolean = true;

  @Input() listButton: buttonTableroHome = {
    name: "",
    cantidad: 0,
    link: "",
    linkIcon: "",
  }

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.http.get(this.listButton.linkIcon, { responseType: 'text' })
      .subscribe(svg => {
        this.icono = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }

  accion(link: string): void {
    this.messageEvent.emit(event);
    this.router.navigateByUrl(link);
  }

}
