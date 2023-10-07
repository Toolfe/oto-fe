import { TestBed } from '@angular/core/testing';

import { RolesProfilesGuard } from './roles-profiles.guard';

describe('RolesProfilesGuard', () => {
  let guard: RolesProfilesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesProfilesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
