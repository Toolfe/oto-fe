import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResourceService } from 'src/app/app-root/setup-service/org-setup/resource/resource.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Resource } from '../resource.model';

@Component({
  selector: 'app-add-emp-resource',
  templateUrl: './add-emp-resource.component.html',
  styleUrls: ['./add-emp-resource.component.scss']
})
export class AddEmpResourceComponent implements OnInit {
  resourceForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>, 
    private org:ResourceService,
    @Inject(MAT_DIALOG_DATA) public data:Resource,) { }

  ngOnInit(): void {
    this.resourceForm=this.fb.group({
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
    if(this.resourceForm.valid==true){
      this.org.getResource().subscribe(res=>{

          let dataRow=this.resourceForm.value;
          this.org.postResource(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Added Successfully',1);
          })
          this.resourceForm.reset();
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.resourceForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateResource() {
    this.data.name = this.resourceForm.value.name;
    this.data.description = this.resourceForm.value.description; 
     this.org.postResource(this.data).subscribe(res => {
       this.dialogRef.close();
      this.notification.openSnackBar('Resource Updated Successfully', 1);
    })
    this.resourceForm.reset();
  }

  }