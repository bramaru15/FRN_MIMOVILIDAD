import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFuncionarioComponent } from './help-funcionario.component';

describe('HelpFuncionarioComponent', () => {
  let component: HelpFuncionarioComponent;
  let fixture: ComponentFixture<HelpFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
