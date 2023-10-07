import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDocComponent } from './saved-doc.component';

describe('SavedDocComponent', () => {
  let component: SavedDocComponent;
  let fixture: ComponentFixture<SavedDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
