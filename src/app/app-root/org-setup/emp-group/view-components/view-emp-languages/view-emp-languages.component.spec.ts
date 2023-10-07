import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpLanguagesComponent } from './view-emp-languages.component';

describe('ViewEmpLanguagesComponent', () => {
  let component: ViewEmpLanguagesComponent;
  let fixture: ComponentFixture<ViewEmpLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
