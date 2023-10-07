import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleSetupService } from '../../setup-service/role-setup/role-setup.service';
import { RolesProfileRootComponent } from '../roles-profile-root/roles-profile-root.component';
import { AddRoleEmployeeComponent } from './add-role-employee/add-role-employee.component';

@Component({
  selector: 'app-role-employee',
  templateUrl: './role-employee.component.html',
  styleUrls: ['./role-employee.component.scss']
})
export class RoleEmployeeComponent implements OnInit {

  $roleEmp: any = this.service.roleEmpData;

  constructor(private service: RoleSetupService,
    private dialog: MatDialog,
    private root: RolesProfileRootComponent,
    private router: Router,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.$roleEmp = this.service.roleEmpData;
  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddRoleEmployeeComponent, dialogConfig);
  }


  onSubmit() {
    let data = JSON.stringify(this.root.roleEmpForm.value.basic)
    this.service.roleSetup(this.root.roleEmpForm.value.basic).subscribe(res => {
      this.router.navigateByUrl('/empsetup');
      this.snackBar.open('Roles and Profile setup registered successfully!', 'Close', {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 4000
      })
    });
  }

  removeItem(element: any) {
    this.service.roleEmpData.forEach((value: any, index: any) => {
      if (value == element)
        this.service.roleEmpData.splice(index, 1);
    })
  }

}
