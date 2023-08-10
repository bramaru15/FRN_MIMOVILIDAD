import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupButtonTablaroHomeComponent } from './group-button-tablaro-home.component';

describe('GroupButtonTablaroHomeComponent', () => {
  let component: GroupButtonTablaroHomeComponent;
  let fixture: ComponentFixture<GroupButtonTablaroHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupButtonTablaroHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupButtonTablaroHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
