import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSharingComponent } from './folder-sharing.component';

describe('FolderSharingComponent', () => {
  let component: FolderSharingComponent;
  let fixture: ComponentFixture<FolderSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderSharingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
