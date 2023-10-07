import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContactSetupService } from 'src/app/app-root/setup-service/contact-setup/contact-setup.service';
import { Type2Service } from 'src/app/app-root/setup-service/contact-setup/type2/type2.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Type2 } from '../contact-type2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-type2',
  templateUrl: './add-type2.component.html',
  styleUrls: ['./add-type2.component.scss']
})
export class AddType2Component implements OnInit {
  contactType2:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private contact:Type2Service,
              public dialogRef: MatDialogRef<any>,  
              @Inject(MAT_DIALOG_DATA) public data: Type2) { }

  ngOnInit(): void {
    this.contactType2=this.fb.group({
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
    this.contactType2.patchValue({
      name: this.data.name,
      description: this.data.description,
      createdBy: this.data.createdBy,
      modifiedBy: this.data.modifiedBy,
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateType1() {
    this.data.name = this.contactType2.value.name;
    this.data.description = this.contactType2.value.description; 
    this.contact.updateType2(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Contact Type1 Updated Successfully', 1);
    })
    this.contactType2.reset();
  }

  public addItem():any{
    if(this.contactType2.valid==true){
      var dataRow:any=this.contactType2.value;
      dataRow.active=true;
      dataRow.createdBy=sessionStorage.getItem('id');
      dataRow.modifiedBy=sessionStorage.getItem('id');
      this.contact.postType2(dataRow).subscribe(res=>{
        this.dialogRef.close(res);
        this.notification.openSnackBar('Contact Type2 Added Successfully',1)
      })
      this.contactType2.reset();
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue', 0)
    }
  }


}
