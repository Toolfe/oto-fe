import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PartnerService } from 'src/app/app-root/setup-service/business-partners/partner/partner.service';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { OrderSetupService } from 'src/app/app-root/setup-service/order-setup/order-setup.service';
import { BasicInfoService } from 'src/app/app-root/setup-service/org-setup/basic-info/basic-info.service';
import { CompanyService } from 'src/app/app-root/setup-service/org-setup/company/company.service';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { DesignationService } from 'src/app/app-root/setup-service/org-setup/designation/designation.service';
import { DivisionService } from 'src/app/app-root/setup-service/org-setup/division/division.service';
import { IndustryService } from 'src/app/app-root/setup-service/org-setup/industry/industry.service';
import { LanguagesService } from 'src/app/app-root/setup-service/org-setup/languages/languages.service';
import { LocationService } from 'src/app/app-root/setup-service/org-setup/location/location.service';
import { QualificationService } from 'src/app/app-root/setup-service/org-setup/qualification/qualification.service';
import { ResourceService } from 'src/app/app-root/setup-service/org-setup/resource/resource.service';
import { SubDeptService } from 'src/app/app-root/setup-service/org-setup/sub-dept/sub-dept.service';
import { UnitService } from 'src/app/app-root/setup-service/org-setup/unit/unit.service';
import { UomService } from 'src/app/app-root/setup-service/org-setup/uom/uom.service';
import { WorkingGroupService } from 'src/app/app-root/setup-service/org-setup/working-group/working-group.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { StatusService } from 'src/app/app-root/setup-service/task-master-setup/status/status.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { TaskService } from '../service/task-service.service';

@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.scss']
})
export class CustomFieldComponent implements OnInit, OnDestroy {

  disabled = false;
  update!: boolean;
  minDate = new Date();
  currentUser: any = CommonMethods.userId;

  status$ = this.service.getMasterData('tm008');
  task: any;
  title: string = "Create Assignment";


  subTaskForm: any = FormGroup;
  employeeData: any[] = [];
  employee: any;
  subtask: any;
  messageData: any;

  taskType$: any;
  employee$: any;
  taskData$: any;
  tasks: any;
  subTasks: any
  subTaskId!: any;
  taskid!: number;
  $priority: any;
  priority: any;
  subDept$: any;
  subTaskDependency: any;

  empId: any;
  parentId: any;

  taskPriority: any;
  taskName: any

  taskDependencies: any;
  taskTypes: any;

  emp$ = this.empService.employee$;
  currentSubtaskStatus: any = {};
  taskListSubscription!: Subscription;
  employeeSubscription!: Subscription;
  subDeptSubscription!: Subscription;
  subtaskSubscription!: Subscription;
  taskDependencySubscription!: Subscription;
  prioritySubscription!: Subscription;


  selectedTypeId: any;
  formFields: any = [];
  statusField!: boolean;
  typeFieldsForm: any = FormGroup;
  typeData: any;
  assignee: any;
  observers: any;
  dependencies: any;
  taskrootId: any;
  deptName: any;

  customField: any;
  initiator: any;
  customStatus: any;

  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    private taskType: TypeService,
    private empService: EmployeeService,
    private priorities: PriorityService,
    private subdept: SubDeptService,
    private notification: NotifierService,
    private deptService: DeptService,
    private designationService: DesignationService,
    private divisionService: DivisionService,
    private industryService: IndustryService,
    private languageService: LanguagesService,
    private locationService: LocationService,
    private qualificationService: QualificationService,
    private resourceService: ResourceService,
    private subdeptService: SubDeptService,
    private unitService: UnitService,
    private uomService: UomService,
    private workinggroupService: WorkingGroupService,
    private addressService: BasicInfoService,
    private companyService: CompanyService,
    private partner: PartnerService,
    private status: StatusService,
    private order: OrderSetupService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.typeFieldsForm = this.fb.group({});
    // this.getSubTask();
    // this.getEmployee();
    // this.getPriority();
    // this.getSubDept();
    // this.getSubTaskDependencies();
    this.getTaskById();

    this.taskType$ = this.taskType.resType;
    this.employee = this.empService.resEmp
    this.taskData$ = this.service.taskData;
    this.$priority = this.priorities.resPriority;
    this.subDept$ = this.subdept.resSubDept;

    this.subTaskForm = this.fb.group({
      subtaskTitle: [],
      subtaskDescription: [],
      subtaskCode: [],
      taskTypeId: [],
      typeFields: this.fb.group({}),
      subDepartmentId: [],
      initDate: [],
      initiator: [],
      initTime: [],
      estimatedDate: [],
      completedDate: [],
      completedTime: [],
      target: [],
      actual: [],
      comparisonFactor: [],
      priorityFactor: [],
      percentage: [],
      weightage: [],
      ratingCode: [],
      status: 0,
      createdOn: [],
      modifiedOn: [],
      assigneeId: [],
      observers: [],
      dependencies: [],
      resultant: [],
      parentId: [],
      scaleValue: [],
      rating: [],
      ratingValue: [],
      customizedStatus: 'Todo',
      parentCategory: [],
      task: this.fb.group({
        id: sessionStorage.getItem('taskId'),
      }),
    })
    if (this.data != null) {
      this.update = true;
      this.editData()
    }




  }




  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'allTask', permision);
  }



  getSubTaskDependencies() {
    this.taskDependencySubscription = this.service.getSubTask().subscribe(res => {
      this.subTaskDependency = res.childSubTasks;
    })
  }


  getSubTask() {
    this.subtaskSubscription = this.service.getSubTask().subscribe(res => {
      console.log(res, 'reresss');

      let data: any[] = [];
      data.push(res);
      data.forEach((element: any) => {
        sessionStorage.setItem('rootId', element.task.id)
        let tPriority: any[] = [];
        tPriority.push(element.priorityFactor);
        this.taskPriority = tPriority;
        let type: any[] = [];
        type.push(element.taskType);
        this.taskTypes = type;
        this.parentId = element.id;
        this.subTaskId = element.task.id

      });
    })
  }

  getTaskById() {
    this.service.getMasterData('tm004').subscribe(res => {
      this.taskTypes = res;
    })

  }



  editData() {
    this.getSubTask()
    this.statusField = true
    this.task = this.data
    console.log(this.task, "tttttttttt");

    // this.deptName = this.task.taskType.department.name
    this.assignee = this.task.assignees;
    this.observers = this.task.observers;
    this.dependencies = this.task.dependencies;

    // this.formFields.forEach((field: any) => {
    //   let validators: any;
    //   validators = field.validators;
    // });
    this.subTaskForm.patchValue({
      typeFields: JSON.parse(this.data.typeFields),
      title: this.data.title,
      description: this.data.description,
      code: this.data.code,
      customizedStatus: this.data.customizedStatus,
      subDepartment: this.data.subDepartment,
      initiator: this.data.initiator,
      taskTypeId: this.data.taskTypeId,
      initDate: this.data.initDate,
      initTime: this.data.initTime,
      estimatedDate: this.data.estimatedDate,
      completedDate: this.data.completedDate,
      completedTime: this.data.completedTime,
      target: this.data.target,
      dependencies: this.data.dependencies,
      assignee: this.data.assignee,
      observers: this.data.observers,
      actual: this.data.actual,
      comparisonFactor: this.data.comparisonFactor,
      priorityFactor: this.data.priorityFactor,
      parentId: this.data.parentId
    })
  }



  dropdownChange(type: any) {
    this.selectedTypeId = type.id
    this.service.getTaskTypeFileds(type).subscribe(res => {
      this.formFields = JSON.parse(res[0].customFields);
      console.log(this.formFields, 'formField');
      this.typeFieldsForm = this.fb.group({});
      for (let i = 0; i < this.formFields.length; i++) {
        this.typeFieldsForm.addControl(this.formFields[i].name, new FormControl(''));
        console.log(this.formFields[i].name, 'name');
        // this.taskType.getType().subscribe(res => {
        //   let data: any = res.content;
        //   data.forEach((types: any) => {
        //     this.customField = JSON.parse(types.customFields)
        //   });
        //   this.customField.filter((type: any) => {
        //     if (type.validators.enterBy == false) {
        //       this.initiator = type.name || type.fname || type.projectName;
        //       this.typeFieldsForm.controls[this.initiator].disable();
        //     }
        //   })
        // })
      }

      for (const key in this.typeFieldsForm.value) {
        let data: any = JSON.parse(this.data.typeFields)
        this.typeFieldsForm.patchValue({ [key]: data[key] });
      }
    });
  }

  currentControl(ref: any): any {
    switch (ref) {
      case 'address':
        return this.addressService.address$;
      case 'company':
        return this.companyService.company$;
      case 'department':
        return this.deptService.department$;
      case 'designation':
        return this.designationService.designation$;
      case 'division':
        return this.divisionService.division$;
      case 'employee':
        return this.empService.employee$;
      case 'industry':
        return this.industryService.industry$;
      case 'language':
        return this.languageService.language$;
      case 'location':
        return this.locationService.location$;
      case 'qualification':
        return this.qualificationService.qualification$;
      case 'resource':
        return this.resourceService.resource$;
      case 'sub_department':
        return this.subdeptService.subDept$;
      case 'unit':
        return this.unitService.unit$;
      case 'uom':
        return this.uomService.uom$;
      case 'working_group':
        return this.workinggroupService.workinggroup$;
      case 'partner':
        return this.partner.partner$
      case 'order':
        return this.order.order$;
      default:

        break;
    }
  }

  getEmployee() {
    this.employeeSubscription = this.empService.getEmployee().subscribe((res: any) => {
      this.employee = res.content;
      this.employee.forEach((element: any) => {
        this.empId = element.id;
      });
    })

  }


  getSubDept() {
    this.subDeptSubscription = this.subdept.getSubDepartment().subscribe((res: any) => {
      this.subDept$ = res.content;

    })

  }


  getPriority() {
    this.prioritySubscription = this.priorities.getPriority().subscribe((res: any) => {
      this.$priority = res.content;
      let data = this.$priority
      let obj: any = data.find((o: { priority1: any; }) => o.priority1);
      const arr = Object.values(obj);
      arr.shift();
      arr.pop();
      this.priority = arr;

    })
  }

  // selectStatus(status: string, genericStatus: string) {
  //   let data = this.task
  //   this.customStatus = status;
  //   data.customizedStatus = status
  //   let t: any = {}
  //   t.id = sessionStorage.getItem('rootId')
  //   data.task = t;
  //   let selectedTask: any = this.task;
  //   console.log(selectedTask, 'select');

  //   if (selectedTask.dependencies.length > 0) {
  //     selectedTask.dependencies.forEach((item: any) => {
  //       console.log(item, 'item');


  //       if (item.status == 2) {
  //         if (genericStatus == 'Todo') {
  //           data.status = 0
  //           this.service.updateSubTask(data).subscribe(res => {

  //           })

  //         }
  //         if (genericStatus == 'InProgress') {
  //           data.status = 1
  //           this.service.updateSubTask(data).subscribe(res => {
  //           })

  //         }
  //         if (genericStatus === 'Done') {
  //           data.status = 2
  //           this.service.updateSubTask(data).subscribe(res => {

  //           })
  //         }
  //       }
  //       else if (item.status == 0 || item.status == 1) {
  //         if (genericStatus == 'Todo') {
  //           data.status = 0
  //           this.service.updateSubTask(data).subscribe(res => {
  //           })

  //         }
  //         if (genericStatus == 'InProgress') {
  //           data.status = 1
  //           this.service.updateSubTask(data).subscribe(res => {
  //           })

  //         }
  //         else {
  //           this.notification.openSnackBar('Your Dependencies task is not completed', 2);
  //         }
  //       }

  //     })
  //   }
  //   else if (selectedTask.dependencies.length === 0) {

  //     if (genericStatus == 'Todo') {
  //       data.status = 0
  //       this.service.updateSubTask(data).subscribe(res => {
  //         console.log(res);


  //       })

  //     }
  //     if (genericStatus == 'InProgress') {
  //       data.status = 1
  //       this.service.updateSubTask(data).subscribe(res => {

  //       })

  //     }
  //     if (genericStatus === 'Done') {
  //       data.status = 2
  //       this.service.updateSubTask(data).subscribe(res => {


  //       })
  //     }

  //   }








  // }

  selectStatus(id: number, status: number, statusName: string) {

    this.currentSubtaskStatus.id = id;
    this.currentSubtaskStatus.status = status;
    this.service.updateSubTaskStatus(this.currentSubtaskStatus).subscribe(res => {
      if (res.success) {
        this.task.statusName = statusName;
        this.notification.openSnackBar('Subtask status has been updated', 1);
      }
    });
  }

  updateTask() {
    let task: any = {}
    task.id = sessionStorage.getItem('rootId')
    let dataRow: any = this.data
    dataRow.id = this.data.id;
    // this.typeFieldsForm.controls[this.initiator].enable();
    // dataRow.project = this.data.project;
    // dataRow.title = this.subTaskForm.value.title;
    // dataRow.description = this.subTaskForm.value.description;
    // dataRow.code = this.subTaskForm.value.code;
    // dataRow.initiator = this.subTaskForm.value.initiator;
    dataRow.taskTypeId = this.subTaskForm.value.taskTypeId;
    // dataRow.subDepartment = this.subTaskForm.value.subDepartment
    // dataRow.assignee = this.subTaskForm.value.assignee;
    // dataRow.dependencies = CommonMethods.returnId(this.subTaskForm.value.dependencies);
    // dataRow.observers = CommonMethods.returnId(this.subTaskForm.value.observers);
    // dataRow.initDate = this.subTaskForm.value.initDate;
    // dataRow.estimatedDate = this.subTaskForm.value.estimatedDate;
    // dataRow.completedDate = this.subTaskForm.value.completedDate;
    // dataRow.completedTime = this.subTaskForm.value.completedTime;
    dataRow.typeFields = JSON.stringify(this.typeFieldsForm.value);
    // dataRow.target = this.subTaskForm.value.target;
    // dataRow.comparisonFactor = this.subTaskForm.value.comparisonFactor;
    // dataRow.priorityFactor = this.subTaskForm.value.priorityFactor;
    // dataRow.customizedStatus = this.customStatus
    // dataRow.task = task
    // dataRow.subtaskRating = this.subTaskForm.value.subtaskRating;
    // dataRow.parentId = this.data.parentId;
    console.log(dataRow, 'dataRow');

    this.service.updateSubTaskType(dataRow).subscribe(res => {
      console.log(res, 'rererere');

      this.dialogRef.close(res);
      this.notification.openSnackBar('Task Updated Successfully', 1);
    })
  }


  getStatus(status: any) {
    let taskStatus: string = ""
    if (status == 0) {
      taskStatus = "Todo"
    } else if (status == 1) {
      taskStatus = "In-Progress"
    } else {
      taskStatus = "Done"
    }
    return taskStatus;
  }
  ngOnDestroy(): void {

    this.employeeSubscription.unsubscribe();
    this.subDeptSubscription.unsubscribe();
    this.prioritySubscription.unsubscribe();
    this.subtaskSubscription.unsubscribe();
    this.taskDependencySubscription.unsubscribe();

  }



}
