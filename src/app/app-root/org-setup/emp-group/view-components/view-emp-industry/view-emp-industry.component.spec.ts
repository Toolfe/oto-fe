import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpIndustryComponent } from './view-emp-industry.component';

describe('ViewEmpIndustryComponent', () => {
  let component: ViewEmpIndustryComponent;
  let fixture: ComponentFixture<ViewEmpIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpIndustryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
