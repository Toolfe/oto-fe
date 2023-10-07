import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDeptComponent } from './sub-dept.component';

describe('SubDeptComponent', () => {
  let component: SubDeptComponent;
  let fixture: ComponentFixture<SubDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
