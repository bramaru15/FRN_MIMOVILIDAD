import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFuncionarioComponent } from './inicio-funcionario.component';

describe('InicioFuncionarioComponent', () => {
  let component: InicioFuncionarioComponent;
  let fixture: ComponentFixture<InicioFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
