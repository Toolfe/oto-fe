import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubDeptComponent } from './view-sub-dept.component';

describe('ViewSubDeptComponent', () => {
  let component: ViewSubDeptComponent;
  let fixture: ComponentFixture<ViewSubDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
