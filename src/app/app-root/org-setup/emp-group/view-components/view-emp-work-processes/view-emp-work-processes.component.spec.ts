import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpWorkProcessesComponent } from './view-emp-work-processes.component';

describe('ViewEmpWorkProcessesComponent', () => {
  let component: ViewEmpWorkProcessesComponent;
  let fixture: ComponentFixture<ViewEmpWorkProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpWorkProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpWorkProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
