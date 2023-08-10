import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptuadosComponent } from './exceptuados.component';

describe('ExceptuadosComponent', () => {
  let component: ExceptuadosComponent;
  let fixture: ComponentFixture<ExceptuadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceptuadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExceptuadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
