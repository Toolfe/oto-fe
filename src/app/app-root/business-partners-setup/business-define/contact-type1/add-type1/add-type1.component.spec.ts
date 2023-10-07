import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddType1Component } from './add-type1.component';

describe('AddType1Component', () => {
  let component: AddType1Component;
  let fixture: ComponentFixture<AddType1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddType1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
