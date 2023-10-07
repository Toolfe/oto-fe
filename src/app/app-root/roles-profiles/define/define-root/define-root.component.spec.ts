import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineRootComponent } from './define-root.component';

describe('DefineRootComponent', () => {
  let component: DefineRootComponent;
  let fixture: ComponentFixture<DefineRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
