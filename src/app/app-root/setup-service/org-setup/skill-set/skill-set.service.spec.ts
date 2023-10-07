import { TestBed } from '@angular/core/testing';

import { SkillSetService } from './skill-set.service';

describe('SkillSetService', () => {
  let service: SkillSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
