import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRangeComponent } from './set-range.component';

describe('SetRangeComponent', () => {
  let component: SetRangeComponent;
  let fixture: ComponentFixture<SetRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
