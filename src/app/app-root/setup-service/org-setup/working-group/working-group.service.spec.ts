import { TestBed } from '@angular/core/testing';

import { WorkingGroupService } from './working-group.service';

describe('WorkingGroupService', () => {
  let service: WorkingGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
