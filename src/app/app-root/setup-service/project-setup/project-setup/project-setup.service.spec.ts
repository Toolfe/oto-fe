import { TestBed } from '@angular/core/testing';

import { ProjectSetupService } from './project-setup.service';

describe('ProjectSetupService', () => {
  let service: ProjectSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
