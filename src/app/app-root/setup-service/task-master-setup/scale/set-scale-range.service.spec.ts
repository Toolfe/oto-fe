import { TestBed } from '@angular/core/testing';

import { SetScaleRangeService } from './set-scale-range.service';

describe('SetScaleRangeService', () => {
  let service: SetScaleRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetScaleRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
