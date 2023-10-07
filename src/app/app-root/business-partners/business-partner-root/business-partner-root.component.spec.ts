import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerRootComponent } from './business-partner-root.component';

describe('BusinessPartnerRootComponent', () => {
  let component: BusinessPartnerRootComponent;
  let fixture: ComponentFixture<BusinessPartnerRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnerRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
