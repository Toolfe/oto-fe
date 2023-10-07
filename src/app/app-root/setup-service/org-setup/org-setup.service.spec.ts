import { TestBed } from '@angular/core/testing';

import { OrgSetupService } from './org-setup.service';

describe('OrgSetupService', () => {
  let service: OrgSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
