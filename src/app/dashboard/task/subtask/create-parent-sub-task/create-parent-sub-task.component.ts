import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PartnerService } from 'src/app/app-root/setup-service/business-partners/partner/partner.service';
// import { CategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';
// import { FunctionalityService } from 'src/app/app-root/setup-service/contact-setup/functionality/functionality.service';
import { SubCategoryService } from 'src/app/app-root/setup-service/contact-setup/sub-category/sub-category.service';
import { Type1Service } from 'src/app/app-root/setup-service/contact-setup/type1/type1.service';
import { Type2Service } from 'src/app/app-root/setup-service/contact-setup/type2/type2.service';
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
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { StatusService } from 'src/app/app-root/setup-service/task-master-setup/status/status.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { TaskService } from '../../service/task-service.service';
import { ParentSubTask } from './parent-sub-task-model';
import { DatePipe } from '@angular/common';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-create-parent-sub-task',
  templateUrl: './create-parent-sub-task.component.html',
  styleUrls: ['./create-parent-sub-task.component.scss']
})
export class CreateParentSubTaskComponent implements OnInit, OnDestroy {
  checked = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  update!: boolean;
  minDate = new Date();
  currentUser: any = CommonMethods.userId;

  status$ = this.status.status$;
  task: any;



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
  subTaskId!: number;
  taskid!: number;
  $priority: any;
  priority: any;
  subDept$: any;
  assignee$: any;
  observers$: any;
  priority$: any;
  subTaskDependency: any;
  orders: any;
  empId: any;
  parentId: any;

  taskPriority: any;
  taskName: any

  taskDependencies: any;
  taskTypes: any;
  businessPartners: any;
  emp$ = this.empService.employee$;

  // taskListSubscription!: Subscription;
  // employeeSubscription!: Subscription;
  // subDeptSubscription!: Subscription;
  // subtaskSubscription!: Subscription;
  // taskDependencySubscription!: Subscription;
  // prioritySubscription!: Subscription;


  selectedTypeId: any;
  formFields: any = [];
  statusField!: boolean;
  typeFieldsForm: any = FormGroup;
  typeData: any;
  assignee: any;
  observers: any;
  dependencies: any;
  subdepartment: any
  subDepartments: any;
  serachAssignee: any;
  searchObservers: any;



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
    // private category: CategoryService,
    private subcategory: SubCategoryService,
    private type1: Type1Service,
    private type2: Type2Service,
    // private functionality: FunctionalityService,
    private project: ProjectService,
    private order: OrderSetupService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.typeFieldsForm = this.fb.group({});
    // this.getSubTask();
    // this.getEmployee();
    // this.getPriority();
    // this.getSubDept();
    this.getSubTaskDependencies();
    this.getSubTaskOrders();
    this.getSubTaskTypes();
    this.getSubTaskPartners();
    // this.taskType$ = this.service.getMasterData('tm004');
    this.assignee$ = this.service.getMasterData('em000');
    this.taskData$ = this.service.taskData;
    this.priority$ = this.service.getMasterData('tm007');
    // this.subDept$ = this.service.getMasterData('sd000');
    this.observers$ = this.assignee$;

    this.subTaskForm = this.fb.group({
      subtaskTitle: [],
      subtaskDescription: [],
      code: [],
      subDepartmentId: [],
      orderId: [],
      initDate: new FormControl(this.datePipe.transform(new Date(), 'dd/MM/yyyy, hh:mm a')),
      taskTypeId: [],
      typeFields: this.fb.group({}),
      estimatedDate: [],
      completedDate: [],
      completedTime: [],
      subtaskTargetDate: [],
      comparisonFactor: [],
      subtaskPriorityId: [],
      weightage: [],
      ratingCode: [],
      status: 0,
      createdOn: [],
      modifiedOn: [],
      initiator: [],
      assigneeId: [],
      observers: [],
      dependencies: [],
      parentId: [],
      partnerId: [],
      parentCategory: [],
      customizedStatus: 'Todo',
      subtaskRating: this.fb.group({
        scaleValue: [],
        rating: [],
        ratingValue: 0,
      }),
      task: sessionStorage.getItem('rootId'),
    })
    if (this.data.type != 'create') {
      this.update = true;
      this.editData()
    }


  }

  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'allTask', permision);
  }



  getSubTaskDependencies() {
    this.service.getSubTaskDependencies(this.data.taskId).subscribe(res => {
      this.subTaskDependency = res.data;
    })
  }
  getSubTaskOrders() {
    this.service.getSubTaskOrders(this.data.projectId).subscribe(res => {
      this.orders = res.data;
    })
  }

  getSubTaskTypes() {
    this.service.getSubTaskTypes(this.data.projectId).subscribe(res => {
      this.taskTypes = res.data;
    })
  }

  getSubTaskPartners() {
    this.service.getSubTaskPartners(this.data.projectId).subscribe(res => {
      this.businessPartners = res.data;
    })
  }

  getSubTaskSubdepartments(taskTypeId: number) {
    this.subDepartments = [];
    this.service.getSubTaskSubdepartments(taskTypeId).subscribe(res => {
      this.subDepartments = res.data;
    })
  }



  editData() {
    this.statusField = true
    this.task = this.data
    // this.formFields.forEach((field: any) => {
    //   let validators:any;
    //   validators = field.validators

    // });
    this.service.viewSubTaskById(this.data.id).subscribe(res => {
      this.data = res.data[0];
      this.subTaskForm.patchValue({

        taskTypeId: this.data.taskTypeId,
        typeFields: JSON.parse(this.data.typeFields),
        subtaskTitle: this.data.subtaskTitle,
        subtaskDescription: this.data.subtaskDescription,
        subtaskCode: this.data.subtaskCode,
        customizedStatus: this.data.customizedStatus,
        initiator: this.data.initiator,
        subDepartmentId: this.data.subDepartmentId,
        orderId: this.data.orderId,
        initDate: this.data.createdAt,
        subtaskTargetDate: this.datePipe.transform(this.data.subtaskTargetDate, 'yyyy-MM-ddTHH:mm'),
        completedDate: this.data.completedDate,
        completedTime: this.data.completedTime,
        target: this.data.target,
        assigneeId: this.data.assigneeId,
        dependencies: this.data.dependencies,
        observers: this.data.observers,
        comparisonFactor: this.data.comparisonFactor,
        subtaskPriorityId: this.data.subtaskPriorityId,
        partnerId: this.data.partnerId,
        taskId: this.data.taskId,
        subtaskParentId: this.data.subtaskParentId
      })
      this.selectedFiles = this.data.attachments;
    });
  }

  updateTask() {

    this.data.id = this.data.id;
    this.data.subtaskTitle = this.subTaskForm.value.subtaskTitle;
    this.data.subtaskDescription = this.subTaskForm.value.subtaskDescription;
    this.data.subtaskCode = this.subTaskForm.value.subtaskCode;
    this.data.customizedStatus = this.subTaskForm.value.customizedStatus;
    this.data.initiator = this.subTaskForm.value.initiator;
    this.data.subDepartmentId = this.subTaskForm.value.subDepartmentId;
    this.data.orderId = this.subTaskForm.value.orderId;
    this.data.taskTypeId = this.subTaskForm.value.taskTypeId;
    this.data.observers = this.subTaskForm.value.observers;
    this.data.subtaskPriorityId = this.subTaskForm.value.subtaskPriorityId;
    this.data.dependencies = this.subTaskForm.value.dependencies;
    this.data.assigneeId = this.subTaskForm.value.assigneeId;
    this.data.estimatedDate = this.subTaskForm.value.estimatedDate;
    this.data.completedDate = this.subTaskForm.value.completedDate;
    this.data.completedTime = this.subTaskForm.value.completedTime;
    this.data.typeFields = JSON.stringify(this.typeFieldsForm.value);
    this.data.subtaskTargetDate = this.subTaskForm.value.subtaskTargetDate;
    this.data.comparisonFactor = this.subTaskForm.value.comparisonFactor;
    this.data.priorityFactor = this.subTaskForm.value.priorityFactor;
    this.data.task = this.subTaskForm.value.task;
    this.data.subtaskRating = this.subTaskForm.value.subtaskRating;
    this.data.parentId = this.data.parentId;
    this.data.partnerId = this.data.partnerId;
    console.log(this.data, 'data');

    let formData = new FormData();

    if (this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        if (this.selectedFiles[i].filedata) {
          formData.append('files', this.selectedFiles[i].filedata);
          formData.append('fieldName', this.selectedFiles[i].fieldName);
        }
      }
    }

    formData.append('data', JSON.stringify(this.data));

    this.service.subTaskCreationPost(formData).subscribe((res: any) => {
      this.dialogRef.close(res);
      this.notification.openSnackBar('Task Updated Successfully', 1);

    })
  }



  public addItem(): any {
    if (this.subTaskForm.valid == true) {

      let task: any = {};
      task.id = sessionStorage.getItem('rootId')
      let dataRow: any = this.subTaskForm.value;

      dataRow.typeFields = JSON.stringify(this.typeFieldsForm.value);
      dataRow.parentId = this.data.id;
      dataRow.taskId = this.data.taskId;
      console.log(dataRow, 'dataRow');

      let formData = new FormData();
      if (this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('files', this.selectedFiles[i].filedata);
          formData.append('fieldName', this.selectedFiles[i].fieldName);
        }
      }
      formData.append('data', JSON.stringify(dataRow));

      this.service.subTaskCreationPost(formData).subscribe((data: ParentSubTask) => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Sub Task Created Successfully', 1);


      })
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0);
    }
  }

  dropdownChange(type: any) {
    this.service.getTaskTypeFileds(type).subscribe(res => {

      this.selectedTypeId = type.id
      this.formFields = JSON.parse(res[0].customFields);
      this.typeFieldsForm = this.fb.group({});

      for (let i = 0; i < this.formFields.length; i++) {
        this.typeFieldsForm.addControl(this.formFields[i].name, new FormControl(''));
      }

      let data: any = JSON.parse(this.data.typeFields)
      for (const key in this.typeFieldsForm.value) {
        this.typeFieldsForm.patchValue({ [key]: data[key] });
      }
    });

    this.getSubTaskSubdepartments(type);
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
      case 'contact_category':
      // return this.category.category$;
      case 'contact_sub_category':
        return this.subcategory.subcategory$;
      case 'contact_type1':
        return this.type1.type1$;
      case 'contact_type2':
        return this.type2.type2$;
      case 'contact_functionality':
      // return this.functionality.functionality$;
      case 'partner':
        return this.partner.partner$
      case 'project':
        return this.project.project$;
      case 'order':
        return this.order.order$;
      default:

        break;
    }
  }

  getEmployee() {
    this.empService.getEmployee().subscribe((res: any) => {
      this.employee = res.content;
      this.employee.forEach((element: any) => {
        this.empId = element.id;
      });
    })

  }


  getSubDept() {
    this.subdept.getSubDepartment().subscribe((res: any) => {
      this.subDept$ = res.content;

    })

  }







  getSubTask() {
    this.service.getSubTask().subscribe(res => {
      console.log(res, 'resss');

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



  getPriority() {
    this.priorities.getPriority().subscribe((res: any) => {
      this.$priority = res.content;
      let data = this.$priority
      let obj: any = data.find((o: { priority1: any; }) => o.priority1);
      const arr = Object.values(obj);
      arr.shift();
      arr.pop();
      this.priority = arr;
    })
  }

  selectStatus(status: string, genericStatus: string) {
    let data = this.task
    data.customizedStatus = status
    let t: any = {}
    t.id = sessionStorage.getItem('rootId')
    data.task = t;
    let selectedTask: any = this.task;
    selectedTask.dependencies.filter((item: any) => {
      if (item.status !== 2) {
        this.notification.openSnackBar('Your Dependencies task is not completed', 2);
      } else if (item.status == 2) {
        if (genericStatus == 'Todo') {
          data.status = 0
          this.service.updateSubTask(data).subscribe(() => {
          })

        }
        if (genericStatus == 'InProgress') {
          data.status = 1
          this.service.updateSubTask(data).subscribe(() => {
          })

        }
        if (genericStatus === 'Done') {
          data.status = 2
          this.service.updateSubTask(data).subscribe(() => {
          })
        }
      }
    })

    if (selectedTask.dependencies.length == 0) {
      if (genericStatus == 'Todo') {
        data.status = 0
        this.service.updateSubTask(data).subscribe(() => {

        })

      }
      if (genericStatus == 'InProgress') {
        data.status = 1
        this.service.updateSubTask(data).subscribe(() => {

        })

      }
      if (genericStatus === 'Done') {
        data.status = 2
        this.service.updateSubTask(data).subscribe(() => {

        })
      }

    }

  }

  getAssignee(assignee: any) {
    this.serachAssignee = assignee.value;

  }
  getObservers(observers: any) {
    this.searchObservers = observers.value;

  }

  ngOnDestroy(): void {

    // this.employeeSubscription.unsubscribe();
    // this.subDeptSubscription.unsubscribe();
    // this.prioritySubscription.unsubscribe();
    // this.subtaskSubscription.unsubscribe();
    // this.taskDependencySubscription.unsubscribe();

  }

  downloadFile(data: any) {
    this.service.downloadAttachment(data).subscribe(responseData => saveAs(responseData, data.fileName));
  }

  selectedFileNames = ["Click to select file "];
  selectedFiles: any[] = []; // Array to store the selected files

  onFilesSelected(event: any, control: any) {

    const files: FileList | null = event.target.files;

    if (files !== null) {

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file !== null) {
          this.selectedFiles.push({ filedata: file, fieldName: control.name });
        }
      }
    }
  }

  getSelectedFileNames() {
    return this.selectedFileNames;
  }
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }


}
