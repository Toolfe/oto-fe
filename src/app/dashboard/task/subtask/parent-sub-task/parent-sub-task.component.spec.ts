import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSubTaskComponent } from './parent-sub-task.component';

describe('ParentSubTaskComponent', () => {
  let component: ParentSubTaskComponent;
  let fixture: ComponentFixture<ParentSubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentSubTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
