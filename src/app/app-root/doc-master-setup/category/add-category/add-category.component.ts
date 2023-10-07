import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocCategoryService } from 'src/app/app-root/setup-service/doc-master-setup/category/category.service';
import { DocMasterService } from 'src/app/app-root/setup-service/doc-master-setup/doc-master.service';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { DivisionService } from 'src/app/app-root/setup-service/org-setup/division/division.service';
import { UnitService } from 'src/app/app-root/setup-service/org-setup/unit/unit.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { DocCategory } from '../doc-category-model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
division$=this.division.division$;
unit$=this.unit.unit$;
department$=this.department.department$;


categoryForm:any=FormGroup;
update!:boolean;
docSetup:any;


  constructor(
    private fb:FormBuilder,
    private category:DocCategoryService,
    private division:DivisionService,
    private unit:UnitService,
    private department:DeptService,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:DocCategory
   
  ) { }

  ngOnInit(): void {
    this.categoryForm=this.fb.group({
      code:[],
      name:[],
      divisionId:[],
      unitId:[],
      departmentId:[],
      
    })
    if(this.data!=null){
      this.update = true;
      this.editData()
    }
  }

  editData(){
 
    this.categoryForm.patchValue({
      code: this.data.code,
      name: this.data.name,
      divisionId:this.data.divisionId,
      unitId:this.data.unitId,
      departmentId:this.data.departmentId,

    })
  }

  
  updateCategory() {
    
      this.data.code=this.categoryForm.value.code;
      this.data.name=this.categoryForm.value.name;
      this.data.divisionId=this.categoryForm.value.divisionId;
      this.data.unitId=this.categoryForm.value.unitId;
      this.data.departmentId=this.categoryForm.value.departmentId;
    this.category.postCategory(this.data).subscribe((res:any) => {
      this.dialogRef.close('done');
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.categoryForm.reset();
  }

  addItem(){
    if(this.categoryForm.valid==true){

    let dataRow=this.categoryForm.value;
    this.category.postCategory(dataRow).subscribe(res=>{
      this.dialogRef.close(res);
      this.notification.openSnackBar(' Added successfully',1);
    })
      this.categoryForm.reset()
    }  else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }

}
