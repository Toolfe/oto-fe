import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactType1Component } from './contact-type1.component';

describe('ContactType1Component', () => {
  let component: ContactType1Component;
  let fixture: ComponentFixture<ContactType1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactType1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
