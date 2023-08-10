import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFiltroTableroComponent } from './checkbox-filtro-tablero.component';

describe('CheckboxFiltroTableroComponent', () => {
  let component: CheckboxFiltroTableroComponent;
  let fixture: ComponentFixture<CheckboxFiltroTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxFiltroTableroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxFiltroTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
