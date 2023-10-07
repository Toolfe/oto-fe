import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpOthersInfoComponent } from './emp-others-info.component';

describe('EmpOthersInfoComponent', () => {
  let component: EmpOthersInfoComponent;
  let fixture: ComponentFixture<EmpOthersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpOthersInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpOthersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
