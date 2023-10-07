import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpQualificationComponent } from './add-emp-qualification.component';

describe('AddEmpQualificationComponent', () => {
  let component: AddEmpQualificationComponent;
  let fixture: ComponentFixture<AddEmpQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpQualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
