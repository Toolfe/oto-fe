import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpDesignationComponent } from './add-emp-designation.component';

describe('AddEmpDesignationComponent', () => {
  let component: AddEmpDesignationComponent;
  let fixture: ComponentFixture<AddEmpDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
