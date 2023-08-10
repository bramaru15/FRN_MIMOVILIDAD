import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNotificacionComponent } from './button-notificacion.component';

describe('ButtonNotificacionComponent', () => {
  let component: ButtonNotificacionComponent;
  let fixture: ComponentFixture<ButtonNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonNotificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
