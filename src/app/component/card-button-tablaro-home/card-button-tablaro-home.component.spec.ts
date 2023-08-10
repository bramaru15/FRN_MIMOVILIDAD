import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonTablaroHomeComponent } from './card-button-tablaro-home.component';

describe('CardButtonTablaroHomeComponent', () => {
  let component: CardButtonTablaroHomeComponent;
  let fixture: ComponentFixture<CardButtonTablaroHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardButtonTablaroHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardButtonTablaroHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
