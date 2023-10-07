import { TestBed } from '@angular/core/testing';

import { RoleSetupService } from './role-setup.service';

describe('RoleSetupService', () => {
  let service: RoleSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
