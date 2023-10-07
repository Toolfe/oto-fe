import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrgSetupRootComponent } from '../org-setup-root/org-setup-root.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AppSetupService } from '../../setup-service/app-setup/app-setup.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { BasicInfoService } from '../../setup-service/org-setup/basic-info/basic-info.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { merge, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {

  appResponse$ = this.appService.appSetup$;
  addressStream!: Observable<any>;
  @Input()
  parent: any = FormGroup;
  addresses: any = FormGroup;
  update: boolean = false;
  orgBasicInfo: any;
  orgAddresses: any;

  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;


  id: any;
  myControl = new FormControl();
  constructor(private root: OrgSetupRootComponent,
    private appService: AppSetupService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private service: BasicInfoService,
    private notification: NotifierService,
  ) {
    this.basicInfo();

  }

  isEnable(permision: any) {
    return CommonMethods.userRole('organizationModule', 'basicInfo', permision);
  }

  ngOnInit() {
    this.addresses = this.fb.group({
      address: []
    })
  }

  editData(data: any) {
    this.id = data.id;
    this.addresses.patchValue({
      address: data.address,
    })
    this.update = true;
  }

  updateAddress() {
    var dataRow: any = this.addresses.value;
    dataRow.id = this.id;
    this.service.postAddress(dataRow).subscribe(res => {
      this.notification.openSnackBar('Address Updated Successfully', 1);
      this.basicInfo();
    })
    this.update = false;
    this.addresses.reset();
  }
  clearAddress() {
    this.addresses.reset();
  }
  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
        if (result == 'true') {
            this.service.deleteAddress(data).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.basicInfo();
                        this.notification.openSnackBar('Address Deleted Successfully', 2);
                    }else return;
                },
                (error: any) => {
                    this.notification.openSnackBar('An error occurred while deleting the address', 2);
                }
             );
        } 
    });
}



  public basicInfo() {
    this.service.getAppsetup().subscribe((res: any) => {
      this.orgBasicInfo = res.data.basic_info[0];
      this.orgAddresses = res.data.addresses;
    });
  }

  public addItem(): any {
    if (this.addresses.valid == true) {
      var dataRow: any = this.addresses.value;
      this.service.postAddress(dataRow).subscribe(res => {
        if (res.success) {
          this.notification.openSnackBar('Address Added Successfully', 2);
        } else {
          this.notification.openSnackBar('Address Already Exsists', 2);
        }
       
        this.addresses.reset();  
        this.basicInfo();
      });
    }
    else {
      this.notification.shownNotification('Please fill Address field to continue', 'ok', 'primary', 5000, 'end', 'bottom')
    }
  }
}