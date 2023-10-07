import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpCategoryComponent } from './view-emp-category.component';

describe('ViewEmpCategoryComponent', () => {
  let component: ViewEmpCategoryComponent;
  let fixture: ComponentFixture<ViewEmpCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
