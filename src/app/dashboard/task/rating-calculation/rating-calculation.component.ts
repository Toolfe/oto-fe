import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
import { RatingService } from 'src/app/app-root/setup-service/task-master-setup/rating/rating.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { TaskService } from '../service/task-service.service';


export interface ScaleValue {
  scaleValue: string;


}
export interface Password {
  password: string;


}
@Component({
  selector: 'app-rating-calculation',
  templateUrl: './rating-calculation.component.html',
  styleUrls: ['./rating-calculation.component.scss', './../custom-field/custom-field.component.scss']

})
export class RatingCalculationComponent implements OnInit {
  rating$ = this.service.getMasterData('tm002')
  ratingCalculationForm: any = FormGroup;
  task: any;
  assignee: any;
  ratingvalue: any;
  scaleValue: any[] = [];
  scale: any;
  observers: any;
  dependencies: any;
  typeFields: any;
  subTaskForm!: FormGroup;
  typeFieldsForm!: FormGroup;
  selectedTypeId: any;
  subdepartment: any;
  formFields: any = [];
  type$ = this.taskType.type$;
  taskTypes: any;
  taskSubscription!: Subscription;

  disabled!: boolean;
  customField: any;
  initiator: any;

  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    private rating: RatingService,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<any>,
    private taskType: TypeService,
    private empService: EmployeeService,
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
    private order: OrderSetupService,
    @Inject(MAT_DIALOG_DATA) private data: any

  ) {

  }

  ngOnInit(): void {
    this.typeFieldsForm = this.fb.group({});


    this.getTaskById();
    // this.viewSubTaskDataById();
    this.task = this.service.selectedDropTask;
    console.log(this.task, 'task');

    // this.scaleValue.push(this.task);
    // let scaleValue: any;
    // this.scaleValue.forEach((element: any) => {
    //   scaleValue = element.taskType.scaleValue;
    //   this.scale = scaleValue;
    //   this.observers = element.observers;
    //   this.dependencies = element.dependencies;
    //   this.typeFields = JSON.parse(element.typeFields)
    //   let arr: any = [];
    //   arr.push(this.typeFields);
    // }); 
    // this.ratingCalculationForm = this.fb.group({
    // scaleValue: [],

    // })

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
      this.editData();

    }

  }


  getTaskById() {
    this.service.getMasterData('tm004').subscribe(res => {
      this.taskTypes = res;
    })

  }

  // viewSubTaskDataById() {
  //   this.service.viewSubTaskDataById (this.service.selectedDropTask.id).subscribe(res => {
  //     this.task = res.data[0];
  //     console.log(this.task,'task');
  //  });
  // }

  editData() {
    this.subTaskForm.patchValue({
      taskTypeId: this.data.taskTypeId,
      typeFields: this.data.typeFields ? JSON.parse(this.data.typeFields) : {},
      subtaskTitle: this.data.title,
      subtaskDescription: this.data.description,
      subtaskCode: this.data.code,
      customizedStatus: this.data.customizedStatus,
      initiator: this.data.initiator,
      subDepartmentId: this.data.subDepartmentId,
      initDate: this.data.initDate,
      initTime: this.data.initTime,
      estimatedDate: this.data.estimatedDate,
      completedDate: this.data.completedDate,
      completedTime: this.data.completedTime,
      target: this.data.target,
      actual: this.data.actual,
      dependencies: this.data.dependencies,
      assignee: this.data.assignee,
      observers: this.data.observers,
      comparisonFactor: this.data.comparisonFactor,
      priorityFactor: this.data.priorityFactor,


    })

  }


  dropdownChange(type: any) {
    this.service.getTaskTypeFileds(type).subscribe(res => {
      this.formFields = JSON.parse(res[0].customFields);
      this.typeFieldsForm = this.fb.group({});
      for (let i = 0; i < this.formFields.length; i++) {
        this.typeFieldsForm.addControl(this.formFields[i].name, new FormControl(''));
      }
      for (const key in this.typeFieldsForm.value) {
        let data: any = JSON.parse(this.data.typeFields)
        console.log(data, 'data');
        this.typeFieldsForm.patchValue({ [key]: data[key] })

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


  submitRatingCalculation() {

    let datarow: any = {};
    // data.typeFields=JSON.stringify(this.typeFieldsForm.value);
    // data.rating = this.ratingCalculationForm.value.rating;
    // data.subtaskRating = this.ratingCalculationForm.value;
    let scaleValue = this.task.scaleValue
    let rating = this.subTaskForm.value.rating;
    let ratingPercentage = rating / 100;
    let ratingValue = scaleValue * ratingPercentage;
    datarow.id = this.task.id;
    datarow.taskTypeId = this.subTaskForm.value.taskTypeId;
    datarow.typeFields = JSON.stringify(this.typeFieldsForm.value);
    datarow.ratingValue = ratingValue;
    datarow.scaleValue = scaleValue;
    datarow.rating = rating;
    datarow.ratingValue = datarow.ratingValue.toFixed(1);
    console.log(datarow.ratingValue);
    this.service.updateSubTaskRating(datarow).subscribe(res => {
      this.dialogRef.close(res);
      this.notification.openSnackBar('Rating Added Successfully ', 1)
    })

  }

  getStatus(status: any) {
    let taskStatus: string = ""
    if (status == 1) {
      taskStatus = "Todo"
    } else if (status == 2) {
      taskStatus = "In-Progress"
    } else {
      taskStatus = "Done"
    }
    return taskStatus;
  }

}
