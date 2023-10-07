import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QualificationService } from 'src/app/app-root/setup-service/org-setup/qualification/qualification.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Qualification } from '../qualification.model';

@Component({
  selector: 'app-add-emp-qualification',
  templateUrl: './add-emp-qualification.component.html',
  styleUrls: ['./add-emp-qualification.component.scss']
})
export class AddEmpQualificationComponent implements OnInit {
  qualificationForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>, 
    private org:QualificationService,
    @Inject(MAT_DIALOG_DATA) public data:Qualification,) { }

  ngOnInit(): void {
    this.qualificationForm=this.fb.group({
      name:[],
      description:[],
      setup:this.fb.group({
        id:sessionStorage.getItem('orgId'),
      })
    })
    if(this.data!=null){
      this.update=true;
      this.editData()
    }
  }

  public addItem(){
    if(this.qualificationForm.valid==true){
      var flag=0;
      this.org.getQualification().subscribe(res=>{
          let dataRow=this.qualificationForm.value;
          this.org.postQualification(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Employee Qualification Added Successfully',1);
          })
          this.qualificationForm.reset();
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.qualificationForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateQualification() {
    this.data.name = this.qualificationForm.value.name;
    this.data.description = this.qualificationForm.value.description; 
    this.org.postQualification(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Employee Qualification Updated Successfully', 1);
    })
    this.qualificationForm.reset();
  }


}