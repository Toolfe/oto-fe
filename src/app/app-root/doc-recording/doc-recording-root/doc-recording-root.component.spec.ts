import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRecordingRootComponent } from './doc-recording-root.component';

describe('DocRecordingRootComponent', () => {
  let component: DocRecordingRootComponent;
  let fixture: ComponentFixture<DocRecordingRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRecordingRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRecordingRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
