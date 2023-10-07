import { TestBed } from '@angular/core/testing';

import { UrlRootService } from './url-root.service';

describe('UrlRootService', () => {
  let service: UrlRootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlRootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
