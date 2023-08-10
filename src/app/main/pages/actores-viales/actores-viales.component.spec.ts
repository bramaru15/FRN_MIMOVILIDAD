import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoresVialesComponent } from './actores-viales.component';

describe('ActoresVialesComponent', () => {
  let component: ActoresVialesComponent;
  let fixture: ComponentFixture<ActoresVialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActoresVialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActoresVialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
