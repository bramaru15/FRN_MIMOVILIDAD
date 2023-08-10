import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-checkbox-conductores-uniselect',
  templateUrl: './checkbox-conductores-uniselect.component.html',
  styleUrls: ['./checkbox-conductores-uniselect.component.scss']
})
export class CheckboxConductoresUniselectComponent {
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

  seleccionUnica(row:any){ 
    if(this.selection.selected.length > 0 && !(this.selection.selected.includes(row))) {
      this.selection.clear();
    }
    //
    this.selection.toggle(row);
    this.messageEvent.emit(this.selection);
  }
}
