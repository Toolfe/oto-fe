import { TestBed } from '@angular/core/testing';

import { ContactCategoryService } from './category.service';

describe(' ContactCategoryService ', () => {
  let service:  ContactCategoryService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject( ContactCategoryService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
