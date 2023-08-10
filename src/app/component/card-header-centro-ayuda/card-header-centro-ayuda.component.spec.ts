import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderCentroAyudaComponent } from './card-header-centro-ayuda.component';

describe('CardHeaderCentroAyudaComponent', () => {
  let component: CardHeaderCentroAyudaComponent;
  let fixture: ComponentFixture<CardHeaderCentroAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHeaderCentroAyudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHeaderCentroAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
