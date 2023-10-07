import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactType2Component } from './contact-type2.component';

describe('ContactType2Component', () => {
  let component: ContactType2Component;
  let fixture: ComponentFixture<ContactType2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactType2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
