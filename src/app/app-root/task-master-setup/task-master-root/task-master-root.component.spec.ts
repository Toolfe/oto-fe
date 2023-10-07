import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMasterRootComponent } from './task-master-root.component';

describe('TaskMasterRootComponent', () => {
  let component: TaskMasterRootComponent;
  let fixture: ComponentFixture<TaskMasterRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskMasterRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMasterRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
