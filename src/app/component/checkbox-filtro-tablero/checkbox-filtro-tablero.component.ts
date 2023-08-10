import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-checkbox-filtro-tablero',
  templateUrl: './checkbox-filtro-tablero.component.html',
  styleUrls: ['./checkbox-filtro-tablero.component.scss']
})
export class CheckboxFiltroTableroComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['accion', 'name'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() selection = new SelectionModel<any>(true, []);

  @Output() messageEvent = new EventEmitter<any>();

  @Input() data: any[] = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  eventoSelect(){
    this.messageEvent.emit(this.selection);
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit(): void {
  }
}

/**
 *  dataTabla: MatTableDataSource<any> = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  nombreColumnas = ['icon', 'codigo', 'numero', 'accion'];
 */