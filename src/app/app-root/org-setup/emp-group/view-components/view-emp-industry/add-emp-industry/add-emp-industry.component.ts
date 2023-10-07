import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IndustryService } from 'src/app/app-root/setup-service/org-setup/industry/industry.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Industry } from '../industry.model';

@Component({
  selector: 'app-add-emp-industry',
  templateUrl: './add-emp-industry.component.html',
  styleUrls: ['./add-emp-industry.component.scss']
})
export class AddEmpIndustryComponent implements OnInit {
  industryForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,  
    private org:IndustryService,
    @Inject(MAT_DIALOG_DATA) public data:Industry,) { }

  ngOnInit(): void {
    this.industryForm=this.fb.group({
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
    if(this.industryForm.valid==true){
      this.org.getIndustry().subscribe(res=>{
          let dataRow=this.industryForm.value;
          this.org.postIndustry(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar(' Added Successfully',1);
          })
          this.industryForm.reset();
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.industryForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateIndustry() {
    this.data.name = this.industryForm.value.name;
    this.data.description = this.industryForm.value.description; 
    this.org.postIndustry(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Industry Updated Successfully', 1);
    })
    this.industryForm.reset();
  }



}
