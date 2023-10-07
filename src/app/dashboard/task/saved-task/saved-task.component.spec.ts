import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTaskComponent } from './saved-task.component';

describe('SavedTaskComponent', () => {
  let component: SavedTaskComponent;
  let fixture: ComponentFixture<SavedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
