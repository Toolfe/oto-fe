import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDocComponent } from './approval-doc.component';

describe('ApprovalDocComponent', () => {
  let component: ApprovalDocComponent;
  let fixture: ComponentFixture<ApprovalDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
