import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSetupRootComponent } from './org-setup-root.component';

describe('OrgSetupRootComponent', () => {
  let component: OrgSetupRootComponent;
  let fixture: ComponentFixture<OrgSetupRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgSetupRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSetupRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
