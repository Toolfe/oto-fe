import { TestBed } from '@angular/core/testing';

import { ContactSetupService } from './contact-setup.service';

describe('ContactSetupService', () => {
  let service: ContactSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
