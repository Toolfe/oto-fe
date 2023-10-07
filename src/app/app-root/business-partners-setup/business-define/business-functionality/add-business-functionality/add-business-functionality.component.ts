import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactSetupService } from 'src/app/app-root/setup-service/business-contact-setup/business-contact-setup.service';
import { FunctionalityService } from 'src/app/app-root/setup-service/business-contact-setup/business-functionality/business-functionality.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessFunctionality } from '../business-functionality.model';

@Component({
  selector: 'app-add-functionality',
  templateUrl: './add-business-functionality.component.html',
  styleUrls: ['./add-business-functionality.component.scss']
})
export class AddBusinessFunctionalityComponent implements OnInit {
  businessfunctionality:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private contact:FunctionalityService,
              public dialogRef: MatDialogRef<any>,  
              @Inject(MAT_DIALOG_DATA) public data: BusinessFunctionality) { }

  ngOnInit(): void {
    this.businessfunctionality=this.fb.group({
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
    this.businessfunctionality.patchValue({
      name: this.data.name,
      description: this.data.description,
      createdBy: this.data.createdBy,
      modifiedBy: this.data.modifiedBy,
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateFunctionality() {
    this.data.name = this.businessfunctionality.value.name;
    this.data.description = this.businessfunctionality.value.description; 
    this.contact.updateFunctionality(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Business Partner  Functionality Updated Successfully', 1);
    })
    this.businessfunctionality.reset();
  }

  public addItem():any{
    if(this.businessfunctionality.valid==true){
      var dataRow:any=this.businessfunctionality.value;
      dataRow.active=true;
      dataRow.createdBy=sessionStorage.getItem('id');
      dataRow.modifiedBy=sessionStorage.getItem('id');
      this.contact.postFunctionality(dataRow).subscribe(res=>{
        this.dialogRef.close(res);
        this.notification.openSnackBar('Business Partner  Functionality Added Successfully', 1);
      })
      this.businessfunctionality.reset();
    

    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }


}
