import { TestBed } from '@angular/core/testing';

import { EmpTypeService } from './emp-type.service';

describe('EmpTypeService', () => {
  let service: EmpTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
