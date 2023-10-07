import { TestBed } from '@angular/core/testing';

import { Type1Service } from './type1.service';

describe('Type1Service', () => {
  let service: Type1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Type1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
