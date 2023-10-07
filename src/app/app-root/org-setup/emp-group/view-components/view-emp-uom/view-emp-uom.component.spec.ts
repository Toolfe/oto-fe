import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpUOmComponent } from './view-emp-uom.component';

describe('ViewEmpUOmComponent', () => {
  let component: ViewEmpUOmComponent;
  let fixture: ComponentFixture<ViewEmpUOmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpUOmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpUOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
