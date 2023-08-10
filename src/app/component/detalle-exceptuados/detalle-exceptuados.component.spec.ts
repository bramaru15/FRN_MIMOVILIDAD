import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleExceptuadosComponent } from './detalle-exceptuados.component';

describe('DetalleExceptuadosComponent', () => {
  let component: DetalleExceptuadosComponent;
  let fixture: ComponentFixture<DetalleExceptuadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleExceptuadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleExceptuadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
