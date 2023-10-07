import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpLanguagesComponent } from './add-emp-languages.component';

describe('AddEmpLanguagesComponent', () => {
  let component: AddEmpLanguagesComponent;
  let fixture: ComponentFixture<AddEmpLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
