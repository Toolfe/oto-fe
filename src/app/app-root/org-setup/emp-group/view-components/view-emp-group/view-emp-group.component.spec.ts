import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpGroupComponent } from './view-emp-group.component';

describe('ViewEmpGroupComponent', () => {
  let component: ViewEmpGroupComponent;
  let fixture: ComponentFixture<ViewEmpGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
