import { TestBed } from '@angular/core/testing';

import { SetupRootService } from './setup-root.service';

describe('SetupRootService', () => {
  let service: SetupRootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupRootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
