import { Component, OnInit } from '@angular/core';
import { AllProjectComponent } from 'src/app/app-root/project/all-project/all-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers:[AllProjectComponent]
})
export class ProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
