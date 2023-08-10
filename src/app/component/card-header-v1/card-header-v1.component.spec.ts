import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderV1Component } from './card-header-v1.component';

describe('CardHeaderV1Component', () => {
  let component: CardHeaderV1Component;
  let fixture: ComponentFixture<CardHeaderV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHeaderV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHeaderV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
