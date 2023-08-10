import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBtnHomeV2Component } from './card-btn-home-v2.component';

describe('CardBtnHomeV2Component', () => {
  let component: CardBtnHomeV2Component;
  let fixture: ComponentFixture<CardBtnHomeV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBtnHomeV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBtnHomeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
