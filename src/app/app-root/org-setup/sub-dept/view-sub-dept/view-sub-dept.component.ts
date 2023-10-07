import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { SubDeptService } from 'src/app/app-root/setup-service/org-setup/sub-dept/sub-dept.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { SubDept } from './sub-dept.model';

@Component({
  selector: 'app-view-sub-dept',
  templateUrl: './view-sub-dept.component.html',
  styleUrls: ['./view-sub-dept.component.scss']
})
export class ViewSubDeptComponent implements OnInit {

  dept$=this.dept.department$;
  searchDept!:string;
  tempDeptId:any={};
  subDeptForm:any=FormGroup;
  update:boolean=false;
  

 
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private dept:DeptService,
              public dialogRef: MatDialogRef<any>,  
              private org:SubDeptService,
              @Inject(MAT_DIALOG_DATA) public data:SubDept) { }

  ngOnInit(): void {
    this.subDeptForm=this.fb.group({
      code:[],
      name:[],
      description:[],
      departmentId:[],
    })
    if(this.data!=null){
      this.update = true;
      this.editData()
    } 
  }

  getId(data:any){
    this.tempDeptId['id']=data.id;
  }

  editData(){

    
    this.subDeptForm.patchValue({
      departmentId:this.data.departmentId,
      code: this.data.code,
      name: this.data.name,
      description: this.data.description,
    })
  }

  
  updateSubDept() {
    this.data.departmentId=this.subDeptForm.value.departmentId;
    this.data.name = this.subDeptForm.value.name;
    this.data.code = this.subDeptForm.value.code;
    this.data.description = this.subDeptForm.value.description; 
    
    
    this.org.postSubDepartment(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Sub Department Updated Successfully', 1);
    })
    this.subDeptForm.reset();
  }

  public addItem(): any {
    if (this.subDeptForm.valid == true) {
      var dataRow: any = this.subDeptForm.value;
      
      
      this.org.postSubDepartment(dataRow).subscribe(data => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Sub Department Added Successfully', 1);
      })
      this.subDeptForm.reset();
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }
  getDept(dept:any){
    this.searchDept=dept.value;
  }
}
