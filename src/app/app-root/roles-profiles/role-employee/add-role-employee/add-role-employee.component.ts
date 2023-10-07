import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleEmpService } from 'src/app/app-root/setup-service/role-setup/role-emp/role-emp.service';
import { RoleSetupService } from 'src/app/app-root/setup-service/role-setup/role-setup.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';

@Component({
  selector: 'app-add-role-employee',
  templateUrl: './add-role-employee.component.html',
  styleUrls: ['./add-role-employee.component.scss']
})
export class AddRoleEmployeeComponent implements OnInit {
  roleEmployeeForm: any = FormGroup;

  constructor(private fb: FormBuilder,
    private service: RoleSetupService,
    private rolesetup: RoleEmpService,
    private notification: NotifierService) { }

  ngOnInit(): void {
    this.roleEmployeeForm = this.fb.group({
      customisedRole: [],
      employeeId: [],

    })
  }

  public addItem() {
    if (this.roleEmployeeForm.valid == true) {
      let dataRow = this.roleEmployeeForm.value;
      dataRow.active = true;
      this.rolesetup.postRoleEmp(dataRow);
      this.roleEmployeeForm.reset();

    }
    else {
      this.notification.shownNotification('Please fill all required fields to continue', 'ok', 'primary', 5000, 'end', 'bottom')
    }
  }
}
