import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactPartnerComponent } from './add-contact-partner.component';

describe('AddContactPartnerComponent', () => {
  let component: AddContactPartnerComponent;
  let fixture: ComponentFixture<AddContactPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
