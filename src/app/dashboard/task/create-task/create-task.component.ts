import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { GroupService } from 'src/app/app-root/setup-service/task-master-setup/group/group.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { TaskService } from '../service/task-service.service';
import { Tasks } from './task-model';



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],

})
export class CreateTaskComponent implements OnInit {
  @ViewChild('filter', { static: false }) filter!: ElementRef;
  subTask: any = new FormControl;

  checked = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  minDate = new Date();

  update!: boolean;
  loading: boolean = false;
  formFields: any = [];


  taskForm: any = FormGroup;

  typeId!: number;

  orgdivCode: any;
  orgLocCode: any;
  orgunitCode: any
  orgDepartmentCode: any
  orgLocation: any;
  orgDivison: any;
  orgUnit: any
  orgDepartment: any;
  orgSubDepartment: any

  taskType$: any;
  taskGroup$: any;
  projects$: any;
  prioritylist: any;
  employee$: any;
  priority$: any;
  $reccurence: any
  $recType: any;
  recType: any[] = [];



  resDept: any;
  $priority: any;
  priority: any;
  employee: any;



  // dept$=this.deptService.department$;
  // emp$=this.empService.employee$;
  type$ = this.taskType.type$;
  group$ = this.taskGroup.group$;



  prioritySubscription!: Subscription;
  taskSubscription!: Subscription;

  searchProject: any;
  searchInitiator: any;

  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    private notification: NotifierService,
    private taskGroup: GroupService,
    private taskType: TypeService,
    private projectService: ProjectService,
    private empService: EmployeeService,
    private priorityService: PriorityService,
    private deptService: DeptService,
    @Inject(MAT_DIALOG_DATA) public data: Tasks,
    private dialogRef: MatDialogRef<any>,

  ) {
    this.projects$ = this.service.getMasterData('pm000');
    this.employee$ = this.service.getMasterData('em000');
    this.priority$ = this.service.getMasterData('tm007');
  }

  ngOnInit() {
    // this.getEmployee();
    // this.getPriority();

    this.taskForm = this.fb.group({
      taskCode: [],
      taskTitle: [],
      taskDescription: [],
      initiatorId: [],
      projectId: [],
      priorityId: [],
      targetDate: [],


      // completedOn: [],
      // target: [],
      // actual: [],
      // comparisonFactor: [],
      // priorityId: [],
      // percentage: [],
      // ratingCode: [],
      // parentCategory: [],
      // parentId: [],
      // weightage: [],
      // resultant: [],
      // status: 0,
      // approval: [],
      // approvalStatus: 0,
      // approvedBy: this.fb.group({
      //   id: sessionStorage.getItem('empId'),
      // }),

    })
    if (this.data != null) {
      this.minDate = new Date('25-12-2022')
      this.update = true;
      this.editData()
    }
  }
  getEmployee() {
    this.service.getEmployee().subscribe(res => {
      this.employee = res.data;
    })
  }
  getPriority() {
    this.priorityService.getPriority().subscribe(res => {
      this.priority = res.data;
    })
  }
  editData() {
    console.log(this.data, 'datatta');

    this.taskForm.patchValue({
      taskTitle: this.data.taskTitle,
      taskDescription: this.data.taskDescription,
      initiatorId: this.data.initiatorId,
      projectId: this.data.projectId,
      taskCode: this.data.taskCode,
      targetDate: this.data.targetDate,
      // completedOn: this.data.completedOn,
      // target: this.data.target,
      // actual: this.data.actual,
      // comparisonFactor: this.data.comparisonFactor,
      priorityId: this.data.priorityId,
    })
  }


  updateTask() {

    if (this.taskForm.valid == true) {
      let dataRow: any = this.data;
      dataRow.id = this.data.id;
      dataRow.taskTitle = this.taskForm.value.taskTitle;
      dataRow.taskDescription = this.taskForm.value.taskDescription;
      dataRow.initiatorId = this.taskForm.value.initiatorId;
      dataRow.projectId = this.taskForm.value.projectId;
      dataRow.taskCode = this.taskForm.value.taskCode;
      dataRow.targetDate = this.taskForm.value.targetDate;
      dataRow.completedOn = this.taskForm.value.completedOn;
      dataRow.priorityId = this.taskForm.value.priorityId;
      dataRow.subTasks = this.data.subTasks
      console.log(dataRow, 'data111');
      if (this.data.isDuplicate === true) {
        this.service.taskCreationDuplication(dataRow).subscribe(res => {
          console.log(res, 'up');
          this.dialogRef.close(res);
          this.notification.openSnackBar('Task Duplicated Successfully', 1);
        })
      } else {
        this.service.taskCreationPost(dataRow).subscribe(res => {
          console.log(res, 'up');
          this.dialogRef.close(res);
          this.notification.openSnackBar(' Updated Successfully', 1);
        })
      }
    } else {
      this.notification.openSnackBar('Please fill all required fileds', 0)
    }

  }



  public addItem(): any {
    if (this.taskForm.valid == true) {
      this.loading = true;
      let dataRow = this.taskForm.value;
      this.service.taskCreationPost(dataRow).subscribe((res: Tasks) => {
        this.dialogRef.close('done');
        this.notification.openSnackBar('Task Created Successfully', 1)
      }),
        (error: any) => {
          this.loading = false;
          if (error.status == 0) {
            this.notification.openSnackBar("Something went wrong, Please try again later", 0)
          }
          else {
            this.notification.openSnackBar(error, 0)
          }
        }

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0)
    }
  }






  // getPriority(){
  //   this.prioritySubscription=this.priorityService.getPriority().subscribe((res:any)=>{
  //     this.$priority=res.content;
  //     let data=this.$priority
  //     let obj:any = data.find((o: { priority1: any; }) => o.priority1);
  //     const arr = Object.values(obj);
  //      arr.shift();
  //     arr.pop();
  //     this.priority=arr;

  //   })
  // }


  getProject(projectId: any) {
    this.searchProject = projectId.value;
  }
  getInitiator(initiatorId: any) {
    this.searchInitiator = initiatorId.value;

  }



}

