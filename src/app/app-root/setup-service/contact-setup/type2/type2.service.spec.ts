import { TestBed } from '@angular/core/testing';

import { Type2Service } from './type2.service';

describe('Type2Service', () => {
  let service: Type2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Type2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
