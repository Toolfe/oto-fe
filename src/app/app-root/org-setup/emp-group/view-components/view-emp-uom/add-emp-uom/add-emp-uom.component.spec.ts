import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpUomComponent } from './add-emp-uom.component';

describe('AddEmpUomComponent', () => {
  let component: AddEmpUomComponent;
  let fixture: ComponentFixture<AddEmpUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpUomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
