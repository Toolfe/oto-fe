import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocMasterRootComponent } from './doc-master-root.component';

describe('DocMasterRootComponent', () => {
  let component: DocMasterRootComponent;
  let fixture: ComponentFixture<DocMasterRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocMasterRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocMasterRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
