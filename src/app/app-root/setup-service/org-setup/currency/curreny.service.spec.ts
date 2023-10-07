import { TestBed } from '@angular/core/testing';

import { CurrenyService } from './curreny.service';

describe('CurrenyService', () => {
  let service: CurrenyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrenyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
