import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderNumberComponent } from './add-order-number.component';

describe('AddOrderNumberComponent', () => {
  let component: AddOrderNumberComponent;
  let fixture: ComponentFixture<AddOrderNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
