import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpResourceComponent } from './add-emp-resource.component';

describe('AddEmpResourceComponent', () => {
  let component: AddEmpResourceComponent;
  let fixture: ComponentFixture<AddEmpResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
