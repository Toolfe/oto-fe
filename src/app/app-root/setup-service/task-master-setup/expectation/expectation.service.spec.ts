import { TestBed } from '@angular/core/testing';

import { ExpectationService } from './expectation.service';

describe('ExpectationService', () => {
  let service: ExpectationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpectationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
