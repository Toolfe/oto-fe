import { TestBed } from '@angular/core/testing';

import { MobileQueryService } from './mobile-query.service';

describe('MobileQueryService', () => {
  let service: MobileQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
