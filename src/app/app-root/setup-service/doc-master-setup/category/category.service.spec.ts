import { TestBed } from '@angular/core/testing';

import { DocCategoryService } from './category.service';

describe('CategoryService', () => {
  let service: DocCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
