import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConductoresTaxiComponent } from './detalle-conductores-taxi.component';

describe('DetalleConductoresTaxiComponent', () => {
  let component: DetalleConductoresTaxiComponent;
  let fixture: ComponentFixture<DetalleConductoresTaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleConductoresTaxiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleConductoresTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
