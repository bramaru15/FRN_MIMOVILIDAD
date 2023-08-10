import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinInformacionComponent } from './sin-informacion.component';

describe('SinInformacionComponent', () => {
  let component: SinInformacionComponent;
  let fixture: ComponentFixture<SinInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinInformacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
