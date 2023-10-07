import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDocComponent } from './shared-doc.component';

describe('SharedDocComponent', () => {
  let component: SharedDocComponent;
  let fixture: ComponentFixture<SharedDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
