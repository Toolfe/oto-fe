import { TestBed } from '@angular/core/testing';

import { IndustrySkillsService } from './industry-skills.service';

describe('IndustrySkillsService', () => {
  let service: IndustrySkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustrySkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
