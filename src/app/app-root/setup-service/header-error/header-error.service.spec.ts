import { TestBed } from '@angular/core/testing';

import { HeaderErrorService } from './header-error.service';

describe('HeaderErrorService', () => {
  let service: HeaderErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
