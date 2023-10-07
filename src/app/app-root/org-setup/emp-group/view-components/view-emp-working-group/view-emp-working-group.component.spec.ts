import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpWorkingGroupComponent } from './view-emp-working-group.component';

describe('ViewEmpWorkingGroupComponent', () => {
  let component: ViewEmpWorkingGroupComponent;
  let fixture: ComponentFixture<ViewEmpWorkingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpWorkingGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpWorkingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
