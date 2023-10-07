import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDocComponent } from './recent-doc.component';

describe('RecentDocComponent', () => {
  let component: RecentDocComponent;
  let fixture: ComponentFixture<RecentDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
