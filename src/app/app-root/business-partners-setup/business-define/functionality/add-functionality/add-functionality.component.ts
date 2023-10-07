import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactSetupService } from 'src/app/app-root/setup-service/business-contact-setup/business-contact-setup.service';
import { FunctionalityService } from 'src/app/app-root/setup-service/business-contact-setup/business-functionality/business-functionality.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Functionality } from '../functionality.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactFunctionalityService } from 'src/app/app-root/setup-service/contact-setup/functionality/functionality.service';

@Component({
  selector: 'app-add-functionality',
  templateUrl: './add-functionality.component.html',
  styleUrls: ['./add-functionality.component.scss']
})
export class AddFunctionalityComponent implements OnInit {
  functionality:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private contact:ContactFunctionalityService,
              public dialogRef: MatDialogRef<any>,  
              @Inject(MAT_DIALOG_DATA) public data: Functionality) { }

  ngOnInit(): void {
    this.functionality=this.fb.group({
      name: [],
      description: [],
      setup:this.fb.group({
        id:sessionStorage.getItem('orgId')
      })
    })
    if (this.data != null) { 
      this.update = true;
      this.editData()
    }
  }
  editData() {
    this.functionality.patchValue({
      name: this.data.name,
      description: this.data.description,
      createdBy: this.data.createdBy,
      modifiedBy: this.data.modifiedBy,
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateFunctionality() {
    this.data.name = this.functionality.value.name;
    this.data.description = this.functionality.value.description; 
    this.contact.updateFunctionality(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Contact Functionality Updated Successfully', 1);
    })
    this.functionality.reset();
  }

  public addItem():any{
    if(this.functionality.valid==true){
      var dataRow:any=this.functionality.value;
      dataRow.active=true;
      dataRow.createdBy=sessionStorage.getItem('id');
      dataRow.modifiedBy=sessionStorage.getItem('id');
      this.contact.postFunctionality(dataRow).subscribe(res=>{
        this.dialogRef.close(res);
        this.notification.openSnackBar('Contact Functionality Added Successfully', 1);
      })
      this.functionality.reset();
    

    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }


}
