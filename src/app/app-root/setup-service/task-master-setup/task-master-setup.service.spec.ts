import { TestBed } from '@angular/core/testing';

import { TaskMasterSetupService } from './task-master-setup.service';

describe('TaskMasterSetupService', () => {
  let service: TaskMasterSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskMasterSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
