import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEscalateRootComponent } from './assign-escalate-root.component';

describe('AssignEscalateRootComponent', () => {
  let component: AssignEscalateRootComponent;
  let fixture: ComponentFixture<AssignEscalateRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEscalateRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEscalateRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
