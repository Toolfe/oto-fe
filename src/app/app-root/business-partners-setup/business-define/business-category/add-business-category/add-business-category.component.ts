import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/app-root/setup-service/business-contact-setup/business-category/business-category.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { BusinessCategory } from '../businesscategory.model';
import { ContactCategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';

@Component({
  selector: 'app-add-business-category',
  templateUrl: './add-business-category.component.html',
  styleUrls: ['./add-business-category.component.scss']
})
export class AddBusinessCategoryComponent implements OnInit {
  category$=this.contact.category$;
  businessCategoryForm: any = FormGroup;
  update: boolean = false;
 

  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    private contact: CategoryService,
    public dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) public data:BusinessCategory) { }

     

  ngOnInit(): void {
    this.businessCategoryForm = this.fb.group({
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
    this.businessCategoryForm.patchValue({
      name: this.data.name,
      description: this.data.description,
      createdBy: this.data.createdBy,
      modifiedBy: sessionStorage.getItem('id'),
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateCategory() {
    this.data.name = this.businessCategoryForm.value.name;
    this.data.description = this.businessCategoryForm.value.description; 
    this.contact.updateCategory(this.data).subscribe(res => {
      this.notification.openSnackBar('Category Updated Successfully', 1);
    })
    this.businessCategoryForm.reset();
  }

  public addItem(): any {
    if (this.businessCategoryForm.valid == true) {
      var dataRow: any = this.businessCategoryForm.value;
      dataRow.active = true;
      this.contact.postCategory(dataRow).subscribe(data => {
        this.dialogRef.close(data); 
        this.notification.openSnackBar('Category Added Successfully', 1);
      })
      this.businessCategoryForm.reset();
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }



}
