import { TestBed } from '@angular/core/testing';

import { DocMasterService } from './doc-master.service';

describe('DocMasterService', () => {
  let service: DocMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
