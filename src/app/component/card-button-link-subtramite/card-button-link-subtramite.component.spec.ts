import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonLinkSubtramiteComponent } from './card-button-link-subtramite.component';

describe('CardButtonLinkSubtramiteComponent', () => {
  let component: CardButtonLinkSubtramiteComponent;
  let fixture: ComponentFixture<CardButtonLinkSubtramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardButtonLinkSubtramiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardButtonLinkSubtramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
