import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpCategoryComponent } from './add-emp-category.component';

describe('AddEmpCategoryComponent', () => {
  let component: AddEmpCategoryComponent;
  let fixture: ComponentFixture<AddEmpCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
