import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpWorkingGroupComponent } from './add-emp-working-group.component';

describe('AddEmpWorkingGroupComponent', () => {
  let component: AddEmpWorkingGroupComponent;
  let fixture: ComponentFixture<AddEmpWorkingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpWorkingGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpWorkingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
