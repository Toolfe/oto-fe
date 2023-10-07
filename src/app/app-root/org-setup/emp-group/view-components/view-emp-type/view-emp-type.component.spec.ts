import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpTypeComponent } from './view-emp-type.component';

describe('ViewEmpTypeComponent', () => {
  let component: ViewEmpTypeComponent;
  let fixture: ComponentFixture<ViewEmpTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
