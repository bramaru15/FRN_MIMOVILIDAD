import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAccesibilidadComponent } from './btn-accesibilidad.component';

describe('BtnAccesibilidadComponent', () => {
  let component: BtnAccesibilidadComponent;
  let fixture: ComponentFixture<BtnAccesibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAccesibilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAccesibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
