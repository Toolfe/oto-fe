import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpSkillsComponent } from './view-emp-skills.component';

describe('ViewEmpSkillsComponent', () => {
  let component: ViewEmpSkillsComponent;
  let fixture: ComponentFixture<ViewEmpSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
