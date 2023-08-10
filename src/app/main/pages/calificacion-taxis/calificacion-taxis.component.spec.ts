import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionTaxisComponent } from './calificacion-taxis.component';

describe('CalificacionTaxisComponent', () => {
  let component: CalificacionTaxisComponent;
  let fixture: ComponentFixture<CalificacionTaxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionTaxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionTaxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
