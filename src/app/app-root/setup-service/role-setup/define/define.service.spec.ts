import { TestBed } from '@angular/core/testing';

import { DefineService } from './define.service';

describe('DefineService', () => {
  let service: DefineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
