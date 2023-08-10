import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnIdiomaComponent } from './btn-idioma.component';

describe('BtnIdiomaComponent', () => {
  let component: BtnIdiomaComponent;
  let fixture: ComponentFixture<BtnIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnIdiomaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
