import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpIndustryComponent } from './add-emp-industry.component';

describe('AddEmpIndustryComponent', () => {
  let component: AddEmpIndustryComponent;
  let fixture: ComponentFixture<AddEmpIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpIndustryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
