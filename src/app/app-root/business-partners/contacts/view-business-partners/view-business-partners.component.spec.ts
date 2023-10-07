import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBusinessPartnersComponent } from './view-business-partners.component';

describe('ViewBusinessPartnersComponent', () => {
  let component: ViewBusinessPartnersComponent;
  let fixture: ComponentFixture<ViewBusinessPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBusinessPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBusinessPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
