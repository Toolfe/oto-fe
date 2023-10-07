import { TestBed } from '@angular/core/testing';

import { DatafieldService } from './datafield.service';

describe('DatafieldService', () => {
  let service: DatafieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatafieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
