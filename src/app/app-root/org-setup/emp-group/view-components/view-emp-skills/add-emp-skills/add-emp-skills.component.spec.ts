import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpSkillsComponent } from './add-emp-skills.component';

describe('AddEmpSkillsComponent', () => {
  let component: AddEmpSkillsComponent;
  let fixture: ComponentFixture<AddEmpSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
