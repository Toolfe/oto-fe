  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDataFieldsComponent } from './business-data-fields.component';

describe('BusinessDataFieldsComponent', () => {
  let component: BusinessDataFieldsComponent;
  let fixture: ComponentFixture<BusinessDataFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDataFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDataFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
