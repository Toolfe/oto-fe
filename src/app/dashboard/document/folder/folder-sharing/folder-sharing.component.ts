import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { WorkingGroupService } from 'src/app/app-root/setup-service/org-setup/working-group/working-group.service';
import { FolderService } from '../../service/folder-service/folder.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
@Component({
  selector: 'app-folder-sharing',
  templateUrl: './folder-sharing.component.html',
  styleUrls: ['./folder-sharing.component.scss']
})
export class FolderSharingComponent implements OnInit {
  selectedUser :any = [];
  employeeList :any = [];
  empObj: any;
  userContext = CommonMethods.userContext();
  employeeIdsToRemove :any = [];

employee$ = this.employee.employee$.pipe(
  map(employees => {
    return employees
      .filter((emp: any) => !this.employeeIdsToRemove.includes(emp.id))
      .map((emp: any) => { return { id: emp.id, name: emp.firstName + ' ' + emp.lastName } })
  }),
  shareReplay()
);

  // employee$ = this.employee.employee$.pipe(map(employees => {
  //   return employees.map((emp: any) => { return { id: emp.id, name: emp.firstName + ' ' + emp.lastName } })
  // }), shareReplay());

  empGroup$ = this.empGroup.workinggroup$.pipe(shareReplay());
  currentUser$ = this.employee.employee$.pipe(map(employees => {
    return this.empObj = employees.filter((emp: any) => emp.id == this.userContext.employeeId)[0];

  }
  ));
  folderSharingForm: any = FormGroup;
  constructor(private employee: EmployeeService,
    private empGroup: WorkingGroupService,
    
    private fb: FormBuilder,
    private service: FolderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FolderSharingComponent>
  ) { 
    this.employeeIdsToRemove.push(this.data.createdBy);
    this.employeeIdsToRemove.push(this.userContext.employeeId);
    console.log(this.employeeIdsToRemove);
  }

  ngOnInit(): void {
    console.log(this.data);

    this.folderSharingForm = this.fb.group({
      id : [],
      shareWith: [],
      shareWithUser: [],
      shareWithUserWorkGroup: [],
      shareWithUserReportingGroup: [],
      permission: this.fb.group({
        viewPermission: [],
        editPermission: [],
        deletePermission: []
      }),
    })
    this.folderSharingForm.get("shareWith").patchValue(1);
    this.patchFolderSharing();
    this.employeeList = this.employee$;
    
  }

  patchFolderSharing() {

    this.service.getShareDetails(this.data.id).subscribe(res => {
      
      if (res.success == true) {
        this.selectedUser = res.data[0].sharedUsers; 
        this.folderSharingForm.patchValue({
          id : res.data[0].id,
          shareWith : res.data[0].typeId,
          shareWithUser :  res.data[0].employeeIds
        })
      }
    })

    // let access: any = this.data.folderAccessManagement
    // if (access.shareWithUser.length > 0) {
    //   this.folderSharingForm.get("shareWith").patchValue(1);
    //   let userArr: any[] = this.returnArr(access.shareWithUser, 'user')
    //     .map((emp: any) => { return { id: emp.id, name: emp.firstName + ' ' + emp.lastName } })
    //   this.folderSharingForm.get("shareWithUser").patchValue(userArr);
    //   console.log(userArr);
    // } else if (access.shareWithUserWorkGroup.length > 0) {
    //   let userGroupArr: any[] = this.returnArr(access.shareWithUserWorkGroup, 'userworkgroup');
    //   console.log(userGroupArr);
    //   this.folderSharingForm.get("shareWith").patchValue(2);
    // } else if (access.shareWithUserReportingGroup.length > 0) {
    //   this.folderSharingForm.get("shareWith").patchValue(3);
    //   let userReportGroupArr: any[] = this.returnArr(access.shareWithUserReportingGroup, 'shareWithUserReportingGroup');
    //   console.log(userReportGroupArr);
    // }

  }

  filterEmployeesById(selectedIds: number[]): void {
    this.employee$
      .pipe(
        map(employees => employees.filter((employee: { id: number; }) => selectedIds.includes(employee.id)))
      )
      .subscribe(filteredEmployees => {
        this.selectedUser = filteredEmployees.map((employee: { name: any; }) => employee.name);
      });
  }

  
  returnArr(data: any[], key: string) {
    let arr: any = [];
    data.forEach(element => {
      arr.push(element[key]);
    });
    console.log(arr);

    return arr;
  }
  get shareWith() {
    return this.folderSharingForm.get("shareWith");
  }

  get shareWithUser() {
    return this.folderSharingForm.get("shareWithUser");
  }

  get shareWithUserWorkGroup() {
    return this.folderSharingForm.get("shareWithUserWorkGroup");
  }

  onUserRemoved(user: string) {
    const users = this.shareWithUser.value as string[];
    this.removeFirst(users, user);
    this.shareWithUser.setValue(users); // To trigger change detection
    this.onUserRemovedselectedUser(user)
  }

  onUserRemovedselectedUser(selectedNames: string | any[]){
    for (let i = this.selectedUser.length - 1; i >= 0; i--) {
      const name = this.selectedUser[i];
      if (selectedNames.includes(name)) {
        this.selectedUser.splice(i, 1);
      }
    }
  }

  filterListByName<T>(array: T[], name: string): void {
    let employee = this.employeeList.filter((item: { name: string; }) => item.name === name);
    const index = array.indexOf(employee.id);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  onWorkGroupRemoved(workGroup: string) {
    const workGroups = this.shareWithUserWorkGroup.value as string[];
    this.removeFirst(workGroups, workGroup);
    this.shareWithUserWorkGroup.setValue(workGroups); // To trigger change detection
  }


  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }


  onFileShare() {
    let obj: any = {};

    console.log(this.folderSharingForm.value);
    obj = this.folderSharingForm.value;
    obj.folderId = this.data.id;
    console.log(obj.shareWith);

    if (this.shareWith.value == 1) {
      // obj.shareWithUser = obj.shareWithUser.flatMap((element: any) => {
      //   let groupObj: any = [];
      //   groupObj.push(element.id);
      //   return groupObj;
      // })
    } else if (this.shareWith.value == 2) {
      obj.shareWithUserWorkGroup = obj.shareWithUserWorkGroup.flatMap((element: any) => {
        let groupObj: any = [];
        groupObj.push(element.id);
        return groupObj;
      })
    } else {
      let reportArr: any = [];
      reportArr.push({ id: this.empObj.functionalReportingId });
      reportArr.push({ id: this.empObj.businessReportingId });
      obj.shareWithUserReportingGroup = reportArr.flatMap((element: any) => {
        let groupObj: any = [];
        groupObj.push(element.id);
        return groupObj;
      })

    }

    this.service.updateFolderAccess(obj).subscribe(res => {
      res.status = 'done';
      this.dialogRef.close(res);
    })

  }
}
