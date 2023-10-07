import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTypeRootComponent } from './report-type-root.component';

describe('ReportTypeRootComponent', () => {
  let component: ReportTypeRootComponent;
  let fixture: ComponentFixture<ReportTypeRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTypeRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTypeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
