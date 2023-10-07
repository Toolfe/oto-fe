import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
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
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { Subtask } from '../create-task/task-model';
import { TaskService } from '../service/task-service.service';
// import { SubTask } from '../sub-task.model';
import { DatePipe } from '@angular/common';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-quick-access-creation',
  templateUrl: './quick-access-creation.component.html',
  styleUrls: ['./quick-access-creation.component.scss']
})
export class QuickaAccessCreationComponent implements OnInit, OnDestroy {

  @Input()
  checked = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  update!: boolean;
  minDate = new Date();
  currentUser: any = CommonMethods.userId;




  subTaskForm: any = FormGroup;
  employeeData: any[] = [];
  employee: any;
  subtask: any;
  messageData: any;

  taskType$: any;
  assignee$: any;
  observers$: any;
  priority$: any;
  taskData$: any;
  subDept$: any;
  tasks: any;
  subTasks: any
  subTaskId!: number;
  taskid!: number;
  $priority: any;
  priority: any;


  empId: any;

  taskName: any
  taskPriority: any;
  taskDependencies: any;
  taskTypes: any;
  taskdependency: any;
  subTaskDependency: any;
  orders: any;


  taskSubscription!: Subscription;
  prioritySubscription!: Subscription;
  employeeSubscription!: Subscription;
  mergeTaskDependency!: Subscription;
  taskTypeSubscription!: Subscription;
  subtasksubcription!: Subscription;
  taskDependencySubscription!: Subscription;

  type$ = this.taskType.type$;
  subdept$ = this.subdept.subDept$;
  emp$ = this.empService.employee$;
  task$ = this.service.mergeTask$

  loading: boolean = false;
  selectedTypeId: any;

  typeFieldsForm: any = FormGroup;
  formFields: any = [];
  typeData: any;
  subDept: any;
  subDepartments: any;
  subDepartmentId: any;
  time = new Date();
  serachAssignee: any;
  searchObservers: any;
  employeelists: any;
  selectedFileLocation!: string;
  selectedFile!: File;


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
    // private category: CategoryService,
    private subcategory: SubCategoryService,
    private type1: Type1Service,
    private type2: Type2Service,
    // private functionality: FunctionalityService,
    private project: ProjectService,
    private order: OrderSetupService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    //console.log(this.data,'dattatat');

  }

  ngOnInit() {
    this.getSelectedFileNames()
    this.typeFieldsForm = this.fb.group({});
    this.getTasks();
    // this.getPriority();
    this.getEmployee();
    // this.getTaskType();
    // this.getTaskById();
    // this.getSubTaskDependencies();
    // this.getSubTaskOrders();
    // this.getSubTaskTypes();
    this.$priority = this.priorities.resPriority;
    this.assignee$ = this.service.getMasterData('em000');
    this.priority$ = this.service.getMasterData('tm007');
    this.observers$ = this.assignee$;

    const defaultTime = '23:59'; // Default time set to 23:59
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    const subtaskTargetDate = `${formattedDate}T${defaultTime}`;
    this.subTaskForm = this.fb.group({
      taskId: [],
      subtaskTitle: [],
      taskTypeId: [],
      orderId: [],
      typeFields: this.fb.group({}),
      assigneeId: [],
      estimatedDate: [],
      subtaskTargetDate: subtaskTargetDate,
      subtaskPriorityId: 5,
      status: 0,
    })
    if (this.data.type != "create") {
      this.update = true;
      this.editData();
    }


  }

  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'allTask', permision);
  }




  editData() {
    console.log(this.data, 'obs');
    this.service.viewSubTaskDataById(this.data.id).subscribe(res => {
      this.data = res.data[0];
      this.subTaskForm.patchValue({
        taskId: this.data.taskId,
        taskTypeId: this.data.taskTypeId,
        typeFields: JSON.parse(this.data.typeFields),
        subtaskTitle: this.data.subtaskTitle,
        subtaskDescription: this.data.subtaskDescription,
        subtaskCode: this.data.subtaskCode,
        customizedStatus: this.data.customizedStatus,
        initiator: this.data.initiator,
        subDepartmentId: this.data.subDepartmentId,
        orderId: this.data.orderId,
        initDate: this.data.initDate,
        subtaskTargetDate: this.datePipe.transform(this.data.subtaskTargetDate, 'yyyy-MM-ddTHH:mm'),
        completedDate: this.data.completedDate,
        completedTime: this.data.completedTime,
        target: this.data.target,
        assigneeId: this.data.assigneeId,
        dependencies: this.data.dependencies,
        observers: this.data.observers,
        comparisonFactor: this.data.comparisonFactor,
        subtaskPriorityId: this.data.subtaskPriorityId,
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
    this.data.subtaskInitiationOn = this.subTaskForm.value.subtaskInitiationOn;
    this.data.estimatedDate = this.subTaskForm.value.estimatedDate;
    this.data.completedDate = this.subTaskForm.value.completedDate;
    this.data.completedTime = this.subTaskForm.value.completedTime;
    this.data.subtaskTargetDate = this.subTaskForm.value.subtaskTargetDate;
    this.data.comparisonFactor = this.subTaskForm.value.comparisonFactor;
    this.data.subtaskPriorityId = this.subTaskForm.value.subtaskPriorityId
    this.data.createdOn = this.subTaskForm.value.createdOn;
    this.data.modifiedOn = this.subTaskForm.value.modifiedOn;
    this.data.dependencies = this.subTaskForm.value.dependencies;
    this.data.assigneeId = this.subTaskForm.value.assigneeId;
    this.data.observers = this.subTaskForm.value.observers;
    this.data.typeFields = JSON.stringify(this.typeFieldsForm.value);

    this.data.resultant = this.subTaskForm.value.resultant;
    this.data.task = this.subTaskForm.value.task;
    this.data.project = this.data.project;
    console.log(this.data, 'datat');

    let formData = new FormData();

    if (this.selectedFiles?.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        if (this.selectedFiles[i].filedata) {
          formData.append('files', this.selectedFiles[i].filedata);
          formData.append('fieldName', this.selectedFiles[i].fieldName);
        }
      }
    }

    formData.append('data', JSON.stringify(this.data));

    this.service.subTaskCreationPost(formData).subscribe(res => {
      console.log(res);
      this.dialogRef.close(res);
      this.notification.openSnackBar('Task Updated Successfully', 1);
    })
  }

  public addItem(): any {
    if (this.subTaskForm.valid) {

      let dataRow: any = this.subTaskForm.value;
      dataRow.subTasks = [];

      let customFields: any = {};
      customFields = this.typeFieldsForm.value;
      dataRow.typeFields = JSON.stringify(customFields);

      let formData = new FormData();
      if (this.selectedFiles?.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('files', this.selectedFiles[i].filedata);
          formData.append('fieldName', this.selectedFiles[i].fieldName);
        }
      }
      formData.append('data', JSON.stringify(dataRow));
      this.service.subTaskCreationPost(formData).subscribe((res: Subtask) => {
        console.log(res, 'res');
        this.dialogRef.close(res);
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
      console.log(this.formFields);

      this.typeFieldsForm = this.fb.group({});
      for (let i = 0; i < this.formFields.length; i++) {
        this.typeFieldsForm.addControl(this.formFields[i].name, new FormControl(''));
      }
      let data: any = JSON.parse(this.data.typeFields)
      for (const key in this.typeFieldsForm.value) {
        this.typeFieldsForm.patchValue({ [key]: data[key] });
      }

      console.log(this.typeFieldsForm);

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
      case 'partner':
        return this.partner.partner$
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
      case 'project':
        return this.project.project$;
      case 'order':
        return this.order.order$;
      default:

        break;
    }
  }

  // getTask() {
  //   this.taskSubscription = this.service.getTask().subscribe(res => {
  //     console.log(res, 'ressssssssssssss1');

  //     this.tasks = res;
  //     this.tasks.forEach((data: any) => {
  //       let tName: any[] = [];
  //       let tPriority: any[] = [];
  //       tName.push(data.subtaskTitle);
  //       tPriority.push(data.subtaskPriorityId);
  //       this.taskName = tName;
  //       this.taskPriority = tPriority;
  //       this.taskid = data.id;
  //     })
  //   })
  // }





  // getPriority() {
  //   this.prioritySubscription = this.priorities.getPriority().subscribe((res: any) => {
  //     this.$priority = res.content;
  //     let data = this.$priority
  //     let obj: any = data.find((o: { priority1: any; }) => o.priority1);
  //     const arr = Object.values(obj);
  //     arr.shift();
  //     arr.pop();
  //     this.priority = arr;
  //   })
  // }

  // getEmployee() {
  //   this.employeeSubscription = this.empService.getEmployee().subscribe(res => {
  //     this.employee = res.content;
  //     this.employee.forEach((element: any) => {
  //       this.empId = element.id;
  //     });
  //   })
  // }

  getTasks() {
    this.service.getTasks().subscribe(res => {
      this.tasks = res.data;
    })
  }

  getTaskById() {
    this.taskTypeSubscription = this.taskType.getType().subscribe(res => {
      this.taskType = res.content;
    })
  }

  // getTaskType() {
  //   this.service.getTaskType().subscribe(res => {
  //     this.taskTypes = res.data;
  //   })
  // }
  taskSelection(data: any) {
    this.getSubTaskOrders(data.projectId);
    this.getSubTaskTypes(data.projectId);
  }

  getEmployee() {
    const projectId = 0;
    this.service.getEmployee().subscribe(res => {
      this.employeelists = res.data;
    })
  }

  getSubTaskDependencies() {
    this.service.getSubTaskDependencies(this.data.taskId).subscribe(res => {
      this.subTaskDependency = res.data;
    })
  }

  getSubTaskOrders(projectId: number) {
    this.service.getSubTaskOrders(projectId).subscribe(res => {
      this.orders = res.data;
    })
  }

  getSubTaskTypes(projectId: number) {
    this.service.getSubTaskTypes(projectId).subscribe(res => {
      this.taskTypes = res.data;
    })
  }

  getSubTaskSubdepartments(taskTypeId: number) {
    this.subDepartments = [];
    this.service.getSubTaskSubdepartments(taskTypeId).subscribe(res => {
      this.subDepartments = res.data;
    })
  }

  downloadFile(data: any) {
    this.service.downloadAttachment(data).subscribe(responseData => saveAs(responseData, data.fileName));
  }


  getAssignee(assignee: any) {
    this.serachAssignee = assignee.value;

  }
  getObservers(observers: any) {
    this.searchObservers = observers.value;

  }

  onFileUpload(fileField: String) {
    console.log(fileField);
    console.log(this.typeFieldsForm.get(fileField).value);


  }


  ngOnDestroy() {
    // this.taskSubscription.unsubscribe();
    // this.prioritySubscription.unsubscribe();
    // this.employeeSubscription.unsubscribe();
    // this.taskDependencySubscription.unsubscribe();
  }

  selectedFileNames = ["Click to select file "];
  selectedFiles: any[] = []; // Array to store the selected files

  onFilesSelected(event: any, control: any) {

    // Get the selected files from the input event

    const files: FileList | null = event.target.files;

    // Check if files is not null

    if (files !== null) {

      // Add each selected file to the selectedFiles array and store their names in selectedFileNames

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file !== null) {
          // this.selectedFiles.push(file);
          this.selectedFiles.push({ filedata: file, fieldName: control.name });
        }
      }
    }
  }

  // Function to upload the selected files one by one
  // onAttachmentUpload() {

  //   for (const selectedFile of this.selectedFiles) {
  //     this.service.onUploadAttachment(selectedFile).subscribe(data => {

  //       // Clear the existing selectedFiles and selectedFileNames arrays

  //       this.selectedFiles = [];

  //       if (this.data === 'reload') {
  //         window.location.reload();
  //       }
  //     });
  //   }
  // }

  getSelectedFileNames() {
    return this.selectedFileNames;
  }
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}
