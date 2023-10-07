import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpSpecificSkillsComponent } from './view-emp-specific-skills.component';

describe('ViewEmpSpecificSkillsComponent', () => {
  let component: ViewEmpSpecificSkillsComponent;
  let fixture: ComponentFixture<ViewEmpSpecificSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpSpecificSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpSpecificSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
