import { TestBed } from '@angular/core/testing';

import { AppSetupService } from './app-setup.service';

describe('AppSetupService', () => {
  let service: AppSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
