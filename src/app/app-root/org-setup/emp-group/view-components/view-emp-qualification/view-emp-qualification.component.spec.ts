import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpQualificationComponent } from './view-emp-qualification.component';

describe('ViewEmpQualificationComponent', () => {
  let component: ViewEmpQualificationComponent;
  let fixture: ComponentFixture<ViewEmpQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpQualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
