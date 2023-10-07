import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRootComponent } from './help-root.component';

describe('HelpRootComponent', () => {
  let component: HelpRootComponent;
  let fixture: ComponentFixture<HelpRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
