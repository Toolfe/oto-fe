import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpTypeService } from 'src/app/app-root/setup-service/org-setup/emp-type/emp-type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { EmpType } from './emp-type.model';

@Component({
  selector: 'app-add-emp-type',
  templateUrl: './add-emp-type.component.html',
  styleUrls: ['./add-emp-type.component.scss']
})
export class AddEmpTypeComponent implements OnInit {
  empTypeForm:any=FormGroup
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,  
    private org:EmpTypeService,
    @Inject(MAT_DIALOG_DATA) public data:EmpType,) { }

  ngOnInit(): void {
    this.empTypeForm=this.fb.group({
      name:[],
      description:[],
      setup:this.fb.group({
        id:sessionStorage.getItem('orgId')
      }),
    })
    if(this.data!=null){
      this.update=true;
      this.editData()
    }
  }
  public addItem(){
    if(this.empTypeForm.valid==true){
      this.org.getEmpType().subscribe(res=>{
          let dataRow=this.empTypeForm.value;
          this.org.postEmpType(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Employee Type Added Successfully',1);
          })
          this.empTypeForm.reset();
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
   
  }

  editData(){
    this.empTypeForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateEmpType() {
    this.data.name = this.empTypeForm.value.name;
    this.data.description = this.empTypeForm.value.description; 
    this.org.postEmpType(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Employee Type Updated Successfully', 1);
    })
    this.empTypeForm.reset();
  }
  }
