import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupsButtonLinkSubtramiteComponent } from './grups-button-link-subtramite.component';

describe('GrupsButtonLinkSubtramiteComponent', () => {
  let component: GrupsButtonLinkSubtramiteComponent;
  let fixture: ComponentFixture<GrupsButtonLinkSubtramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupsButtonLinkSubtramiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupsButtonLinkSubtramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
