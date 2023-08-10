import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparendosComponent } from './comparendos.component';

describe('ComparendosComponent', () => {
  let component: ComparendosComponent;
  let fixture: ComponentFixture<ComparendosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparendosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparendosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
