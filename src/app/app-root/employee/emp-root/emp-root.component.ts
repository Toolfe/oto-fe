import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
@Component({
  selector: 'app-emp-root',
  templateUrl: './emp-root.component.html',
  styleUrls: ['./emp-root.component.scss']
})
export class EmpRootComponent implements OnInit {
  employeeForm: any = FormGroup;
  employee = new FormControl;

  employeeDetails: boolean = false;
  userRoleAccess: any;
  constructor() { 
    this.userRoleAccess = CommonMethods.userContext();
  }


  ngOnInit() {
    if (sessionStorage.getItem('role') == '1') {
      this.employeeDetails = true;


    }
    if (sessionStorage.getItem('role') == '2') {
      let profiles: any = this.userRoleAccess.customRole;
      profiles = JSON.parse(profiles);

      profiles.forEach((profile: any): any => {
        profile = JSON.parse(profile.employeeModule);
        if (profile.employeeDetails.selection == true || profile.employeeDetails.creation == true || profile.employeeDetails.deletion == true ||
          profile.employeeDetails.updation == true) {
          this.employeeDetails = true;
          return this.employeeDetails;
        }

      })


    }


  }

}
