import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubTaskComponent } from './view-sub-task.component';

describe('ViewSubTaskComponent', () => {
  let component: ViewSubTaskComponent;
  let fixture: ComponentFixture<ViewSubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
