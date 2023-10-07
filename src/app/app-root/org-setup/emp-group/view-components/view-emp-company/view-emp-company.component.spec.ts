import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpCompanyComponent } from './view-emp-company.component';

describe('ViewEmpCompanyComponent', () => {
  let component: ViewEmpCompanyComponent;
  let fixture: ComponentFixture<ViewEmpCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
