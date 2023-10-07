import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpResourceComponent } from './view-emp-resource.component';

describe('ViewEmpResourceComponent', () => {
  let component: ViewEmpResourceComponent;
  let fixture: ComponentFixture<ViewEmpResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
