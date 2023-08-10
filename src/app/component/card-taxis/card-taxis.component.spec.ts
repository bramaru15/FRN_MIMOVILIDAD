import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaxisComponent } from './card-taxis.component';

describe('CardTaxisComponent', () => {
  let component: CardTaxisComponent;
  let fixture: ComponentFixture<CardTaxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTaxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTaxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
