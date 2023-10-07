import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DesignationService } from 'src/app/app-root/setup-service/org-setup/designation/designation.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Designation } from '../designation-model';

@Component({
  selector: 'app-add-emp-designation',
  templateUrl: './add-emp-designation.component.html',
  styleUrls: ['./add-emp-designation.component.scss']
})
export class AddEmpDesignationComponent implements OnInit {
  designationForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,
    private org:DesignationService,
    @Inject(MAT_DIALOG_DATA) public data:Designation) { }

    Designation:Designation=new Designation();

    ngOnInit(): void {
        this.designationForm=this.fb.group({
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
        this.designationForm.patchValue({
          name: this.data.name,
          code: this.data.code,
          description: this.data.description
        })
      }
    
      
      updateDesignation() {
        this.data.name = this.designationForm.value.name;
        this.data.description = this.designationForm.value.description; 
        this.org.postDesignation(this.data).subscribe(res => {
          this.dialogRef.close();
          this.notification.openSnackBar('Designation Updated Successfully', 1);
        })
        this.designationForm.reset();
      }
    
      public addItem(): any {
        if (this.designationForm.valid == true) {
          var dataRow: any = this.designationForm.value;
          this.org.postDesignation(dataRow).subscribe(data => {
            this.dialogRef.close(data);
            this.notification.openSnackBar('Designation Added Successfully', 1);
          })
          this.designationForm.reset();
        }
        else {
          this.notification.openSnackBar('Please fill all required fields to continue',0);
        }
      }

}
