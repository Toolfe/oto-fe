import { TestBed } from '@angular/core/testing';

import { AssignSetupService } from './assign-setup.service';

describe('AssignService', () => {
  let service: AssignSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
