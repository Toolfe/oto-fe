import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickaAccessCreationComponent } from './quick-access-creation.component';

describe('QuickaAccessCreationComponent', () => {
  let component: QuickaAccessCreationComponent;
  let fixture: ComponentFixture<QuickaAccessCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickaAccessCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickaAccessCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
