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
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  comment: string = '';
  latitude: number | undefined;
  longitude: number | undefined;
  locationError: string | undefined;
  locationDetails: any;
  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    private notification: NotifierService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any) { 
      this.getLocation()
    }

  ngOnInit() {



    if (this.data != null) {
      this.comment = this.data.comment;
      this.editData()
    }
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.locationError = undefined;
        },
        (error) => {
          this.locationError = 'Error getting location: ' + error.message;
        }
      );
    } else {
      this.locationError = 'Geolocation is not supported by this browser.';
    }
  }





  updateTask(){
    this.data.latitude = this.latitude
    this.data.longitude = this.longitude
    this.data.locationError = this.locationError 
    this.data.comment = this.comment;
    this.service.updateSubTaskActiveStatus(this.data).subscribe(res => {
      if (res.success == true) {
        this.dialogRef.close(res);
      }
    })
  }
  isEnable(permision: any) {
    return CommonMethods.userRole('taskManagementModule', 'allTask', permision);
  }









  editData() {



  }








  ngOnDestroy(): void {
  }



}
