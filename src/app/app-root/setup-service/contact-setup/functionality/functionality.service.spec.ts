import { TestBed } from '@angular/core/testing';

import { ContactFunctionalityService } from './functionality.service';

describe('ContactFunctionalityService', () => {
  let service: ContactFunctionalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactFunctionalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
