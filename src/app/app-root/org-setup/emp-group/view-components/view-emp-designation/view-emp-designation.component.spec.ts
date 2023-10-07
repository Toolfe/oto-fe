import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpDesignationComponent } from './view-emp-designation.component';

describe('ViewEmpDesignationComponent', () => {
  let component: ViewEmpDesignationComponent;
  let fixture: ComponentFixture<ViewEmpDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
