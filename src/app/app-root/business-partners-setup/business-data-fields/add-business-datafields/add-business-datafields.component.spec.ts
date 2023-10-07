import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessDatafieldsComponent } from './add-business-datafields.component';

describe('AddBusinessDatafieldsComponent', () => {
  let component: AddBusinessDatafieldsComponent;
  let fixture: ComponentFixture<AddBusinessDatafieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessDatafieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessDatafieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
