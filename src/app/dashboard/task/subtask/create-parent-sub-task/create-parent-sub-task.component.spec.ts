import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParentSubTaskComponent } from './create-parent-sub-task.component';

describe('CreateParentSubTaskComponent', () => {
  let component: CreateParentSubTaskComponent;
  let fixture: ComponentFixture<CreateParentSubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParentSubTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParentSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
