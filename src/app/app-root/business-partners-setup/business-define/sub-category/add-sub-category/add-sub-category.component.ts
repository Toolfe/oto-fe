import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategoryService } from 'src/app/app-root/setup-service/business-contact-setup/sub-category/sub-category.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { SubCategory } from '../subcategory.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/app-root/setup-service/business-contact-setup/business-category/business-category.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  category$ = this.service.category$;
  subCategoryForm: any = FormGroup;
  update: boolean = false;
  isValueChanged: boolean = false;
  constructor(private fb: FormBuilder,
    private notification: NotifierService ,
    private service: CategoryService ,

    public dialogRef: MatDialogRef<any>,  
    private contact: SubCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: SubCategory) { }

  ngOnInit(): void {
    this.subCategoryForm = this.fb.group({
      name: [],
      description: [],
      businessPartnerCategory: [],
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
      businessPartnerCategory:this.data.businessPartnerCategoryId,
      modifiedOn: Math.floor(Date.now() / 1000)
    })
  }

  updateSubCategory() {
    this.data.name = this.subCategoryForm.value.name;
    this.data.description = this.subCategoryForm.value.description;
    this.data.businessPartnerCategory = this.subCategoryForm.value.businessPartnerCategory;
    this.contact.updateSubCategory(this.data).subscribe(res => {
      this.category$ = this.service.category$;
      this.dialogRef.close();
      this.notification.openSnackBar('Business Partner Sub Category Updated Successfully', 1);
    })
    this.subCategoryForm.reset();
  }
  public addItem(): any {
    if (this.subCategoryForm.valid == true) {
      var dataRow: any = this.subCategoryForm.value;
      this.contact.postSubCategory(dataRow).subscribe(res => {
      this.dialogRef.close(res);
      this.notification.openSnackBar('Business Partner Sub Category Added Successfully', 1);
      })
      this.subCategoryForm.reset();
    

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }
}