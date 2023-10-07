import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScaleComponent } from './add-scale.component';

describe('AddScaleComponent', () => {
  let component: AddScaleComponent;
  let fixture: ComponentFixture<AddScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
