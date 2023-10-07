import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpectationComponent } from './add-expectation.component';

describe('AddExpectationComponent', () => {
  let component: AddExpectationComponent;
  let fixture: ComponentFixture<AddExpectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
