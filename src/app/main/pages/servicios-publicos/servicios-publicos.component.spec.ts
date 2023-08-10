import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPublicosComponent } from './servicios-publicos.component';

describe('ServiciosPublicosComponent', () => {
  let component: ServiciosPublicosComponent;
  let fixture: ComponentFixture<ServiciosPublicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosPublicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosPublicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
