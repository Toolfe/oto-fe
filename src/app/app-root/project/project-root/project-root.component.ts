import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';


@Component({
  selector: 'app-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss']

})

export class ProjectRootComponent implements OnInit {

  project: any = new FormControl;
  projectForm: any = FormGroup
  userRoleAccess: any;

  projectDetails: boolean = false;

  constructor() {
    this.userRoleAccess = CommonMethods.userContext();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('role') == '1') {
      this.projectDetails = true;

    }
    if (sessionStorage.getItem('role') == '2') {
      let profiles: any = this.userRoleAccess.customRole;
      profiles = JSON.parse(profiles);

      profiles.forEach((profile: any): any => {
        profile = JSON.parse(profile.projectModule);
        if (profile.project.selection == true || profile.project.creation == true || profile.project.deletion == true ||
          profile.project.updation == true) {
          this.projectDetails = true;
          return this.projectDetails;
        }
      })
    }
  }
}