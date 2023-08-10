import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmovilizacionComponent } from './inmovilizacion.component';

describe('InmovilizacionComponent', () => {
  let component: InmovilizacionComponent;
  let fixture: ComponentFixture<InmovilizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmovilizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmovilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
