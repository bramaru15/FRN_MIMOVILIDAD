import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxConductoresUniselectComponent } from './checkbox-conductores-uniselect.component';

describe('CheckboxConductoresUniselectComponent', () => {
  let component: CheckboxConductoresUniselectComponent;
  let fixture: ComponentFixture<CheckboxConductoresUniselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxConductoresUniselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxConductoresUniselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
