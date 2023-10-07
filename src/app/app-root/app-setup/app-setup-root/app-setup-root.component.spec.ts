import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSetupRootComponent } from './app-setup-root.component';

describe('AppSetupRootComponent', () => {
  let component: AppSetupRootComponent;
  let fixture: ComponentFixture<AppSetupRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSetupRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSetupRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
