import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatafieldsComponent } from './add-datafields.component';

describe('AddDatafieldsComponent', () => {
  let component: AddDatafieldsComponent;
  let fixture: ComponentFixture<AddDatafieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDatafieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatafieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
