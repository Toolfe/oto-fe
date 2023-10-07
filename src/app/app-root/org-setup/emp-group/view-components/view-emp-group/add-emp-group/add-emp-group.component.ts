import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpGroupService } from 'src/app/app-root/setup-service/org-setup/emp-group/emp-group.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpGroup } from '../emp-group-model';

@Component({
  selector: 'app-add-emp-group',
  templateUrl: './add-emp-group.component.html',
  styleUrls: ['./add-emp-group.component.scss']
})
export class AddEmpGroupComponent implements OnInit {
  empGroupForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>, 
    private org:EmpGroupService,
    @Inject(MAT_DIALOG_DATA) public data:EmpGroup,) { }

  ngOnInit(): void {
    this.empGroupForm=this.fb.group({
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
    var flag=0;
    if(this.empGroupForm.valid==true){
          let dataRow=this.empGroupForm.value;
          this.org.postEmpGroup(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Employee Group Added Successfully',1);
          })
          this.empGroupForm.reset()
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

    editData(){
      this.empGroupForm.patchValue({
        name: this.data.name,
        code: this.data.code,
        description: this.data.description
      })
    }

    
    updateEmpGroup() {
      this.data.name = this.empGroupForm.value.name;
      this.data.description = this.empGroupForm.value.description; 
      this.org.postEmpGroup(this.data).subscribe(res => {
       this.dialogRef.close('done');
        this.notification.openSnackBar('Employee Group Updated Successfully', 1);
      })
      this.empGroupForm.reset();
    }

}
