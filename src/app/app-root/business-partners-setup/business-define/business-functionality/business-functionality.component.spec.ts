import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFunctionalityComponent } from './business-functionality.component';

describe('BusinessFunctionalityComponent', () => {
  let component: BusinessFunctionalityComponent;
  let fixture: ComponentFixture<BusinessFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessFunctionalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
