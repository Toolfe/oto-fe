import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Type1Service } from 'src/app/app-root/setup-service/contact-setup/type1/type1.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Type1 } from '../contact-type1.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-type1',
  templateUrl: './add-type1.component.html',
  styleUrls: ['./add-type1.component.scss']
})
export class AddType1Component implements OnInit {
  contactType1: any = FormGroup;
  update: boolean = false;
  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    private contact: Type1Service,
    public dialogRef: MatDialogRef<any>,  
    @Inject(MAT_DIALOG_DATA) public data: Type1) { }

  ngOnInit(): void {
    this.contactType1 = this.fb.group({
      name: [],
      description: [],
      setup: this.fb.group({
        id: sessionStorage.getItem('orgId')
      })
    })
    if (this.data != null) {
      this.update = true;
      this.editData()
    }
  }
  editData() {
    this.contactType1.patchValue({
      name: this.data.name,
      description: this.data.description,
      createdBy: this.data.createdBy,
      modifiedBy: this.data.modifiedBy,
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateType1() {
    this.data.name = this.contactType1.value.name;
    this.data.description = this.contactType1.value.description;
    this.contact.updateType1(this.data).subscribe(res => {
      this.dialogRef.close(res);
      this.notification.openSnackBar('Contact Type1 Updated Successfully', 1);
    })
    this.contactType1.reset();
  }

  public addItem(): any {
    if (this.contactType1.valid == true) {
      var dataRow: any = this.contactType1.value;
      dataRow.active = true;
      dataRow.createdBy = sessionStorage.getItem('id');
      dataRow.modifiedBy = sessionStorage.getItem('id');
      this.contact.postType1(dataRow).subscribe(res => {
        this.dialogRef.close(res);
        this.notification.openSnackBar('Contact Type1 Data Added Successfully', 1)
      })

      this.contactType1.reset();
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }



}
