import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeptComponent } from './view-dept.component';

describe('ViewDeptComponent', () => {
  let component: ViewDeptComponent;
  let fixture: ComponentFixture<ViewDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
