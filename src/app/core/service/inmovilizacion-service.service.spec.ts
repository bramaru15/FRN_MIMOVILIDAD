import { TestBed } from '@angular/core/testing';

import { InmovilizacionServiceService } from './inmovilizacion-service.service';

describe('InmovilizacionServiceService', () => {
  let service: InmovilizacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmovilizacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
