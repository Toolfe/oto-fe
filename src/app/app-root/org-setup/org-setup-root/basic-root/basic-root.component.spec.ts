import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRootComponent } from './basic-root.component';

describe('BasicRootComponent', () => {
  let component: BasicRootComponent;
  let fixture: ComponentFixture<BasicRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
