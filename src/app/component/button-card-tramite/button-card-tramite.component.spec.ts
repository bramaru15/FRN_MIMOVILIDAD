import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCardTramiteComponent } from './button-card-tramite.component';

describe('ButtonCardTramiteComponent', () => {
  let component: ButtonCardTramiteComponent;
  let fixture: ComponentFixture<ButtonCardTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCardTramiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCardTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
