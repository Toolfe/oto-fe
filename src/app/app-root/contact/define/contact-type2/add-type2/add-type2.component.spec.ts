import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddType2Component } from './add-type2.component';

describe('AddType2Component', () => {
  let component: AddType2Component;
  let fixture: ComponentFixture<AddType2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddType2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
