import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPhotoComponent } from './emp-photo.component';

describe('EmpPhotoComponent', () => {
  let component: EmpPhotoComponent;
  let fixture: ComponentFixture<EmpPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
