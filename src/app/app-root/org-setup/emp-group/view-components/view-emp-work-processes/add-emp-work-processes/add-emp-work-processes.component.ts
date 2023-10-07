import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkProcessService } from 'src/app/app-root/setup-service/org-setup/work-process/work-process.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { WorkProcess } from '../workprocess.model';

@Component({
  selector: 'app-add-emp-work-processes',
  templateUrl: './add-emp-work-processes.component.html',
  styleUrls: ['./add-emp-work-processes.component.scss']
})
export class AddEmpWorkProcessesComponent implements OnInit {

  workProcessForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,  
    private org:WorkProcessService,
    @Inject(MAT_DIALOG_DATA) public data:WorkProcess,) { }

  ngOnInit(): void {
    this.workProcessForm=this.fb.group({
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
    var flag=0;
    if(this.workProcessForm.valid==true){
      this.org.getWorkProcess().subscribe(res=>{
          let dataRow=this.workProcessForm.value;
          this.org.postWorkProcess(dataRow).subscribe(res=>{
             this.dialogRef.close(res);
            this.notification.openSnackBar('Added Successfully',1);
          })
          this.workProcessForm.reset();

      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
   
  }

  editData(){
    this.workProcessForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description,

    })
  }

  
  updateWorkProcess() {
    this.data.name = this.workProcessForm.value.name;
    this.data.description = this.workProcessForm.value.description; 
    this.org.postWorkProcess(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Employee Grou Updated Successfully', 1);
    })
    this.workProcessForm.reset();
  }
  }
