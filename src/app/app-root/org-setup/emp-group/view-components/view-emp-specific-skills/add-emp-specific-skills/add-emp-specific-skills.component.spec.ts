import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpSpecificSkillsComponent } from './add-emp-specific-skills.component';

describe('AddEmpSpecificSkillsComponent', () => {
  let component: AddEmpSpecificSkillsComponent;
  let fixture: ComponentFixture<AddEmpSpecificSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpSpecificSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpSpecificSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
