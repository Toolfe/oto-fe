import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpWorkProcessesComponent } from './add-emp-work-processes.component';

describe('AddEmpWorkProcessesComponent', () => {
  let component: AddEmpWorkProcessesComponent;
  let fixture: ComponentFixture<AddEmpWorkProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpWorkProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpWorkProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
