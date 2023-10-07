import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectDetailsComponent } from './add-project-details.component';

describe('AddProjectDetailsComponent', () => {
  let component: AddProjectDetailsComponent;
  let fixture: ComponentFixture<AddProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
