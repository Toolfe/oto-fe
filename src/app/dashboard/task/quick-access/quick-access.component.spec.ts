import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickaAccessComponent } from './quick-access.component';

describe('QuickaAccessComponent', () => {
  let component: QuickaAccessComponent;
  let fixture: ComponentFixture<QuickaAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickaAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickaAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
