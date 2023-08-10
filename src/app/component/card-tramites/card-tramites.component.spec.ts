import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTramitesComponent } from './card-tramites.component';

describe('CardTramitesComponent', () => {
  let component: CardTramitesComponent;
  let fixture: ComponentFixture<CardTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTramitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
