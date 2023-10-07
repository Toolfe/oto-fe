import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAllCheckComponent } from './select-all-check.component';

describe('SelectAllCheckComponent', () => {
  let component: SelectAllCheckComponent;
  let fixture: ComponentFixture<SelectAllCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAllCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAllCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
