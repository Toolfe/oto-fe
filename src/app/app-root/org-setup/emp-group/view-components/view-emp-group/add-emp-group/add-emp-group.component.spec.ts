import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpGroupComponent } from './add-emp-group.component';

describe('AddEmpGroupComponent', () => {
  let component: AddEmpGroupComponent;
  let fixture: ComponentFixture<AddEmpGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
