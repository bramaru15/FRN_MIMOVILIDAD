import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderV4Component } from './card-header-v4.component';

describe('CardHeaderV4Component', () => {
  let component: CardHeaderV4Component;
  let fixture: ComponentFixture<CardHeaderV4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHeaderV4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHeaderV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
