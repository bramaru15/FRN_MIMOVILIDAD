import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsButtonCardComponent } from './groups-button-card.component';

describe('GroupsButtonCardComponent', () => {
  let component: GroupsButtonCardComponent;
  let fixture: ComponentFixture<GroupsButtonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsButtonCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsButtonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
