import { TestBed } from '@angular/core/testing';

import { EmpCategoryService } from './emp-category.service';

describe('EmpCategoryService', () => {
  let service: EmpCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
