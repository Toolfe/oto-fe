import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDivisionComponent } from './view-division.component';

describe('ViewDivisionComponent', () => {
  let component: ViewDivisionComponent;
  let fixture: ComponentFixture<ViewDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
