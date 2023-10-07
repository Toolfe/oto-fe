import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsDownloadGuideComponent } from './dms-download-guide.component';

describe('DmsDownloadGuideComponent', () => {
  let component: DmsDownloadGuideComponent;
  let fixture: ComponentFixture<DmsDownloadGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsDownloadGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsDownloadGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
