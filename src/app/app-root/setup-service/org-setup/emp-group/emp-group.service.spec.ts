import { TestBed } from '@angular/core/testing';

import { EmpGroupService } from './emp-group.service';

describe('EmpGroupService', () => {
  let service: EmpGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
