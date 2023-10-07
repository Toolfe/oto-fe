import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpCompanyComponent } from './add-emp-company.component';

describe('AddEmpCompanyComponent', () => {
  let component: AddEmpCompanyComponent;
  let fixture: ComponentFixture<AddEmpCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
