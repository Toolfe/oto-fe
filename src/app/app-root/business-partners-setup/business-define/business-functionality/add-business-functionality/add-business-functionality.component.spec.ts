import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessFunctionalityComponent } from './add-business-functionality.component';

describe('AddBusinessFunctionalityComponent', () => {
  let component: AddBusinessFunctionalityComponent;
  let fixture: ComponentFixture<AddBusinessFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessFunctionalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
