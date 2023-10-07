import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SubTaskAttachmentComponent } from './subtask-attachments.component';

describe('PropertiesComponent', () => {
  let component: SubTaskAttachmentComponent;
  let fixture: ComponentFixture<SubTaskAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTaskAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTaskAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
