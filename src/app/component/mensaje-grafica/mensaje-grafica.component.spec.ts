import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeGraficaComponent } from './mensaje-grafica.component';

describe('MensajeGraficaComponent', () => {
  let component: MensajeGraficaComponent;
  let fixture: ComponentFixture<MensajeGraficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeGraficaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
