import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRootComponent } from './emp-root.component';

describe('EmpRootComponent', () => {
  let component: EmpRootComponent;
  let fixture: ComponentFixture<EmpRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
