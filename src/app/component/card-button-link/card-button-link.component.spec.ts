import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonLinkComponent } from './card-button-link.component';

describe('CardButtonLinkComponent', () => {
  let component: CardButtonLinkComponent;
  let fixture: ComponentFixture<CardButtonLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardButtonLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardButtonLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
