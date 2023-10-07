import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCalculationComponent } from './rating-calculation.component';

describe('RatingCalculationComponent', () => {
  let component: RatingCalculationComponent;
  let fixture: ComponentFixture<RatingCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
