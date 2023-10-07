import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBasicInfoComponent } from './emp-basic-info.component';

describe('EmpBasicInfoComponent', () => {
  let component: EmpBasicInfoComponent;
  let fixture: ComponentFixture<EmpBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
