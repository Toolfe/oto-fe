import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTaskDetailsComponent } from './emp-task-details.component';

describe('EmpTaskDetailsComponent', () => {
  let component: EmpTaskDetailsComponent;
  let fixture: ComponentFixture<EmpTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpTaskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
