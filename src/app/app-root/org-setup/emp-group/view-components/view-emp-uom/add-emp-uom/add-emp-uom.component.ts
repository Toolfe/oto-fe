import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UomService } from 'src/app/app-root/setup-service/org-setup/uom/uom.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Uom } from '../uom.model';

@Component({
  selector: 'app-add-emp-uom',
  templateUrl: './add-emp-uom.component.html',
  styleUrls: ['./add-emp-uom.component.scss']
})
export class AddEmpUomComponent implements OnInit {
  uomForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,
    private org:UomService,
    @Inject(MAT_DIALOG_DATA) public data:Uom,) { }

  ngOnInit(): void {
    this.uomForm=this.fb.group({
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
    let flag=0;
    if(this.uomForm.valid==true){
      this.org.getUom().subscribe(res=>{
          let dataRow=this.uomForm.value;
          this.org.postUom(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Added Successfully',1);
          })
          this.uomForm.reset();
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.uomForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description,
    })
  }

  
  updateUom() {
    this.data.name = this.uomForm.value.name;
    this.data.description = this.uomForm.value.description; 
    this.org.postUom(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar(' Uom Updated Successfully', 1);
    })
    this.uomForm.reset();
  }
  }
