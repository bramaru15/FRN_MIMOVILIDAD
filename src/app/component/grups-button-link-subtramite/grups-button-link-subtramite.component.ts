import { Component, Input, ViewChild, AfterViewInit, Output, OnInit } from '@angular/core';
import { buttonLink, listSubTramites } from 'src/app/model/cardTramite';
import {FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
}


export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = 'Items por página:';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Anterior página';
  paginatorIntl.getRangeLabel = dutchRangeLabel;
  
  return paginatorIntl;
}

@Component({
  selector: 'app-grups-button-link-subtramite',
  templateUrl: './grups-button-link-subtramite.component.html',
  styleUrls: ['./grups-button-link-subtramite.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ]
})
export class GrupsButtonLinkSubtramiteComponent implements OnInit, AfterViewInit  {

  window: Window & typeof globalThis = window;

  @Input() listSubTramites : listSubTramites[] = [
    {
      title: "",
      subtramite: [
        {
          link: "",
          linkVus:false,
          name: "",
          linkIcon: "",
          direciona: false
        }
      ]
    }
  ]

  breakpoint: number = 3;
  filtrarForm = new FormControl('');
  nombreColumnas = ['acto'];


  @ViewChild(MatPaginator)
  paginador!: MatPaginator;

  dataTabla: MatTableDataSource<listSubTramites> = new MatTableDataSource();

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTabla.filter = this.removeAccents(filterValue.trim().toLowerCase());
  }

  removeAccents(str : string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  constructor() {
    this.onResize();
  }


  ngOnInit(): void {
  }

  ngOnChanges() {
    this.dataTabla = new MatTableDataSource(this.listSubTramites);
    this.dataTabla.paginator = this.paginador;
  }

  ngAfterViewInit(): void {
    this.dataTabla = new MatTableDataSource(this.listSubTramites);
    this.dataTabla.paginator = this.paginador;
  }

  onResize() {

    if (window.innerWidth <= 878 && window.innerWidth > 530) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 530) {
      this.breakpoint = 1;
    } else {
      this.breakpoint = 3;
    }

  }

  
}
