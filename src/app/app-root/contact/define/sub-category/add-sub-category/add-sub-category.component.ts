import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubCategoryService } from 'src/app/app-root/setup-service/contact-setup/sub-category/sub-category.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { SubCategory } from '../subcategory.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  subCategoryForm: any = FormGroup;
  update: boolean = false;
  isValueChanged: boolean = false;
  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<any>,  
    private contact: SubCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: SubCategory) { }

  ngOnInit(): void {
    this.subCategoryForm = this.fb.group({
      name: [],
      description: [],
      setup: this.fb.group({
        id: sessionStorage.getItem('orgId')
      })
    })
    if (this.data != null) {
      this.update = true;
      this.editData();
    }
  }
  editData() {
    this.subCategoryForm.patchValue({
      name: this.data.name,
      description: this.data.description,
      createdBy: sessionStorage.getItem('id'),
      modifiedBy: sessionStorage.getItem('id'),
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateSubCategory() {
    this.data.name = this.subCategoryForm.value.name;
    this.data.description = this.subCategoryForm.value.description;
    this.contact.updateSubCategory(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Sub Category Updated Successfully', 1);
    })
    this.subCategoryForm.reset();
  }
  public addItem(): any {
    if (this.subCategoryForm.valid == true) {
      var dataRow: any = this.subCategoryForm.value;
      dataRow.active = true;
      dataRow.createdBy = sessionStorage.getItem('id');
      dataRow.modifiedBy = sessionStorage.getItem('id');
      this.contact.postSubCategory(dataRow).subscribe(res => {
        this.dialogRef.close(res);
        this.notification.openSnackBar('Sub Category Added Successfully', 1);
      })
      this.subCategoryForm.reset();
    

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }




}