import { TestBed } from '@angular/core/testing';

import { RoleEmpService } from './role-emp.service';

describe('RoleEmpService', () => {
  let service: RoleEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
