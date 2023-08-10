import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDescargaComponent } from './app-descarga.component';

describe('AppDescargaComponent', () => {
  let component: AppDescargaComponent;
  let fixture: ComponentFixture<AppDescargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDescargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
