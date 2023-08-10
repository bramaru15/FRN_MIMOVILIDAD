import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCentroAyudaComponent } from './card-centro-ayuda.component';

describe('CardCentroAyudaComponent', () => {
  let component: CardCentroAyudaComponent;
  let fixture: ComponentFixture<CardCentroAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCentroAyudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCentroAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
