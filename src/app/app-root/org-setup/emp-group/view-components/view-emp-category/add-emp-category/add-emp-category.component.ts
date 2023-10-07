import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpCategoryService } from 'src/app/app-root/setup-service/org-setup/emp-category/emp-category.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpCategory } from '../emp-category-model';

@Component({
  selector: 'app-add-emp-category',
  templateUrl: './add-emp-category.component.html',
  styleUrls: ['./add-emp-category.component.scss']
})
export class AddEmpCategoryComponent implements OnInit {
  empCategoryForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              public dialogRef: MatDialogRef<any>,
              private org:EmpCategoryService,
              @Inject(MAT_DIALOG_DATA) public data:EmpCategory) { }

              EmpCategory:EmpCategory=new EmpCategory();

  ngOnInit(): void {
      this.empCategoryForm=this.fb.group({
        name:[],
        description:[],
        setup:this.fb.group({
          id:sessionStorage.getItem('orgId')
        })
      })
      if(this.data!=null){
        this.update=true;
        this.editData()
      }
    }
    editData(){
      this.empCategoryForm.patchValue({
        name: this.data.name,
        code: this.data.code,
        description: this.data.description,
      })
    }
  
    
    updateCategory() {
      this.data.name = this.empCategoryForm.value.name;
      this.data.description = this.empCategoryForm.value.description; 
      this.org.postEmpCategory(this.data).subscribe(res => {
        this.dialogRef.close('done');
        this.notification.openSnackBar('Employee Category Updated Successfully', 1);
      })
      this.empCategoryForm.reset();
    }
  
    public addItem(): any {
      let flag=0;
      if (this.empCategoryForm.valid == true) {
            let dataRow=this.empCategoryForm.value;
            this.org.postEmpCategory(dataRow).subscribe(res=>{
              this.dialogRef.close(res);
              this.notification.openSnackBar('Employee Category Added Successfully',1);
            })
            this.empCategoryForm.reset();
      }
      else {
        this.notification.openSnackBar('Please fill all required fields to continue',0);
      }
    }
  }


