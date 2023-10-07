import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../category.model';
import { ContactCategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private contact:ContactCategoryService,
              public dialogRef: MatDialogRef<any>,  
              @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
    this.category=this.fb.group({
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
    this.category.patchValue({
      name: this.data.name,
      description: this.data.description,
      createdBy: this.data.createdBy,
      modifiedBy: this.data.modifiedBy,
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateCategory() {
    this.data.name = this.category.value.name;
    this.data.description = this.category.value.description; 
    this.contact.updateCategory(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Contact category Updated Successfully', 1);
    })
    this.category.reset();
  }

  public addItem():any{
    if(this.category.valid==true){
      var dataRow:any=this.category.value;
      dataRow.active=true;
      this.contact.postCategory(dataRow).subscribe(res=>{
        this.dialogRef.close(res);
        this.notification.openSnackBar('Contact category Added Successfully', 1);
      })
      this.category.reset();
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }


}
