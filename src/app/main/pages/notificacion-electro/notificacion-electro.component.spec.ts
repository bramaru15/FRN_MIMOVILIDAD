import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionElectroComponent } from './notificacion-electro.component';

describe('NotificacionElectroComponent', () => {
  let component: NotificacionElectroComponent;
  let fixture: ComponentFixture<NotificacionElectroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionElectroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionElectroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
