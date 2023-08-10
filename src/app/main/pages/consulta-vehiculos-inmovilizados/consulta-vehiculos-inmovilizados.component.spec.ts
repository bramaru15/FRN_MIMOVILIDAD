import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVehiculosInmovilizadosComponent } from './consulta-vehiculos-inmovilizados.component';

describe('ConsultaVehiculosInmovilizadosComponent', () => {
  let component: ConsultaVehiculosInmovilizadosComponent;
  let fixture: ComponentFixture<ConsultaVehiculosInmovilizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaVehiculosInmovilizadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaVehiculosInmovilizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
