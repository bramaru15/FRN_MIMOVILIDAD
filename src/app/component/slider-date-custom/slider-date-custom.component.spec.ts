import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDateCustomComponent } from './slider-date-custom.component';

describe('SliderDateCustomComponent', () => {
  let component: SliderDateCustomComponent;
  let fixture: ComponentFixture<SliderDateCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderDateCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderDateCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
