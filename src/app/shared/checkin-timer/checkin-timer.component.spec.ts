import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInTimerComponent } from './checkin-timer.component';

describe('CheckInTimerComponent', () => {
  let component: CheckInTimerComponent;
  let fixture: ComponentFixture<CheckInTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckInTimerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
