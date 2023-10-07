import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpTypeComponent } from './add-emp-type.component';

describe('AddEmpTypeComponent', () => {
  let component: AddEmpTypeComponent;
  let fixture: ComponentFixture<AddEmpTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
