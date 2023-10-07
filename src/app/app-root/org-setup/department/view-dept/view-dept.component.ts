import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { UnitService } from 'src/app/app-root/setup-service/org-setup/unit/unit.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dept } from '../dept.model';

@Component({
  selector: 'app-view-dept',
  templateUrl: './view-dept.component.html',
  styleUrls: ['./view-dept.component.scss']
})
export class ViewDeptComponent implements OnInit {

  unit$=this.unit.unit$;

  searchUnit!:string;
  deptForm:any=FormGroup;
  update:boolean=false;
  tempUnit:any={};
  $unit:any;
  filter:any;
  constructor(private fb:FormBuilder,
              private org:DeptService,
              private notification:NotifierService,
              public dialogRef: MatDialogRef<any>,  
              private unit:UnitService,
              @Inject(MAT_DIALOG_DATA) public data:Dept) { }

  ngOnInit(){
    this.deptForm=this.fb.group({
      unitId:[],
      code:[],
      name:[],
      description:[]
     })
     if(this.data!=null){
      this.update = true;
      this.editData()
    } 
  }

  getUnitId(data:any){
    this.tempUnit.id=data.id;
  }
  editData(){
this.deptForm.patchValue({
      unitId:this.data.unitId,
      code: this.data.code,
      name: this.data.name,
      description: this.data.description
    })
  }

  
  updateDept() {
  this.data.unitId = this.deptForm.value.unitId;
    this.data.name = this.deptForm.value.name;
    this.data.code = this.deptForm.value.code;
    this.data.description = this.deptForm.value.description; 
    this.org.postDepartment(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Department Updated Successfully', 1);
    })
    this.deptForm.reset();
  }

  public addItem(): any {
    if (this.deptForm.valid == true) {
      var dataRow: any = this.deptForm.value;
      this.org.postDepartment(dataRow).subscribe(data => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Department Added Successfully', 1);
      })
      this.deptForm.reset();
    
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }

  getUnit(unit:any){
    this.searchUnit=unit.value;
  }
}
