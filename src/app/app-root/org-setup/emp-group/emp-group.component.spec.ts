import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpGroupComponent } from './emp-group.component';

describe('EmpGroupComponent', () => {
  let component: EmpGroupComponent;
  let fixture: ComponentFixture<EmpGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
