import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignService } from 'src/app/app-root/setup-service/assign-setup/assign/assign.service';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Assign } from '../assign.model';

@Component({
  selector: 'app-add-assign',
  templateUrl: './add-assign.component.html',
  styleUrls: ['./add-assign.component.scss'],
})
export class AddAssignComponent implements OnInit {
  department$ = this.department.department$;
  type$ = this.taskTypes.type$;
  employee$ = this.emp.employee$;
  searchTypeId!: string;
  assignForm: any = FormGroup;
  taskType: any;
  priority: any;
  dept: any;
  employee: any;
  $priority: any;
  update!: boolean;

  type: any;
  taskPriority: any[] = ['normal', 'high', 'critical'];
  departments: any[] = ['d1'];
  employeee: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private fb: FormBuilder,
    private service: AssignService,
    private taskTypes: TypeService,
    private priorities: PriorityService,
    private department: DeptService,
    private emp: EmployeeService,
    private notification: NotifierService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Assign
  ) {}

  ngOnInit(): void {
    this.getPriority();

    this.assignForm = this.fb.group({
      typeId: [],
      priority: [],
      department: [],
      count: [],
      setup: this.fb.group({
        id: sessionStorage.getItem('orgId'),
      }),
      employees: [],
    });

    if (this.data != null) {
      this.update = true;
      this.editData();
    }
  }

  editData() {
    this.assignForm.patchValue({
      typeId: this.data.typeId,
      priority: this.data.priority,
      department: this.data.department,
      count: this.data.count,
      employees: this.getEmp(this.data.employees),
      createdBy: this.data.createdBy,
      modifiedBy: this.data.modifiedBy,
      modifiedOn: Math.floor(Date.now() / 1000),
    });
  }

  getEmp(employees: any) {
    let arr: any[] = [];
    if (employees.length > 0) {
      employees.map((category: any) => {
        arr.push(category.id);
      });
    }
    return arr;
  }

  updateAssign() {
    let dataRow = this.assignForm.value;
    if (dataRow.employees.length > 0) {
      dataRow.employees = dataRow.employees.map((id: any) => {
        return { id: id };
      });
    }
    dataRow.id = this.data.id;
    dataRow.active = true;
    dataRow.createdBy = sessionStorage.getItem('id');
    dataRow.modifiedBy = sessionStorage.getItem('id');
    this.data = dataRow;
    this.service.updateAssign(this.data).subscribe((res: any) => {
      this.dialogRef.close('done');
      this.notification.openSnackBar(' Updated Successfully', 1);
    });
    this.assignForm.reset();
  }

  public addItem(): any {
    if (this.assignForm.valid == true) {
      let dataRow: any = this.assignForm.value;
      if (dataRow.employees.length > 0) {
        dataRow.employees = dataRow.employees.map((id: any) => {
          return { id: id };
        });
      }
      dataRow.active = true;
      dataRow.createdBy = sessionStorage.getItem('id');
      dataRow.modifiedBy = sessionStorage.getItem('id');
      dataRow.setup.id = sessionStorage.getItem('orgId');
      this.service.postAssign(dataRow).subscribe((res:any) => {
       this.dialogRef.close(res);
        this.notification.openSnackBar(' Added Successfully', 1);
      });
      this.assignForm.reset();
    } else {
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }

  getPriority() {
    this.priorities.getPriority().subscribe((res: any) => {
      this.$priority = res.content;
      let data = this.$priority;
      let obj: any = data.find((o: { priority1: any }) => o.priority1);
      const arr = Object.values(obj);
      arr.shift();
      arr.pop();
      this.priority = arr;
    });
  }
  getTypeId(typeId: any) {
    this.searchTypeId = typeId.value;
  }
}
