import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineComponent } from './add-define.component';

describe('AddDefineComponent', () => {
  let component: AddDefineComponent;
  let fixture: ComponentFixture<AddDefineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
