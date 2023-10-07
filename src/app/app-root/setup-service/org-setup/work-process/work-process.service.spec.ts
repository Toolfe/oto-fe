import { TestBed } from '@angular/core/testing';

import { WorkProcessService } from './work-process.service';

describe('WorkProcessService', () => {
  let service: WorkProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
