import { TestBed } from '@angular/core/testing';

import { SubDeptService } from './sub-dept.service';

describe('SubDeptService', () => {
  let service: SubDeptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubDeptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
