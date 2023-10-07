import { TestBed } from '@angular/core/testing';

import { DocMethodsService } from './doc-methods.service';

describe('DocMethodsService', () => {
  let service: DocMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
