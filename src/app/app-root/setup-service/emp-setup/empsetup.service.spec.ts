import { TestBed } from '@angular/core/testing';

import { EmpsetupService } from './empsetup.service';

describe('EmpsetupService', () => {
  let service: EmpsetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpsetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
