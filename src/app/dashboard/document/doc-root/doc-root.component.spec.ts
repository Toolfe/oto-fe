import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRootComponent } from './doc-root.component';

describe('DocRootComponent', () => {
  let component: DocRootComponent;
  let fixture: ComponentFixture<DocRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
