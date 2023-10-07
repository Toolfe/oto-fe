import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { OrderSetupService } from '../../setup-service/order-setup/order-setup.service';
import { ProjectService } from '../../setup-service/project-setup/project.service';
import { Project } from '../project.model';
import { Order } from './order';

@Component({
  selector: 'app-add-order-number',
  templateUrl: './add-order-number.component.html',
  styleUrls: ['./add-order-number.component.scss']
})
export class AddOrderNumberComponent implements OnInit {
  projectOrderForm:any=FormGroup;
  update!:boolean;
  searchProject:any;
  project$=this.project.project$;
  constructor(private fb:FormBuilder,
              private project:ProjectService,
              private service:OrderSetupService,
              private notification:NotifierService,
              public dialogRef: MatDialogRef<any>,
             @Inject(MAT_DIALOG_DATA) public data:Order) { }

  ngOnInit(): void {
    this.projectOrderForm=this.fb.group({
      project:this.fb.group({
             id:[]
      }),
      orderNo:[],
      orderDetails:[]
    })
    if(this.data!=null){
      this.update = true;
      this.editData()
    }
  }
  editData(){
  
    
    this.projectOrderForm.patchValue({
    project: {
        id: this.data.projectId,
      },
      orderDetails: this.data.orderDetails,
      orderNo: this.data.orderNumber,
      createdBy: this.data.createdBy,
      setup:this.data.setup,
      modifiedBy: this.data.modifiedBy,
    })
  }

  updateOrder() {
    if(this.projectOrderForm.valid==true){
      let setup:any={};
      setup.id=sessionStorage.getItem('orgId')
      let dataRow=this.projectOrderForm.value;
      dataRow.id=this.data.id;
      dataRow.setup=setup;
      dataRow.active=true;
    this.service.updateOrder(dataRow).subscribe(res => {
     this.dialogRef.close("Done"); 
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.projectOrderForm.reset();
  }else{
    this.notification.openSnackBar('Please fill all required fileds',0)
  }
  }


  public addItem():any{
     if(this.projectOrderForm.valid==true){
      let dataRow=this.projectOrderForm.value;
      dataRow.active=true;
      this.service.postOrder(dataRow).subscribe((res:any)=>{
       this.dialogRef.close('done');
        this.notification.openSnackBar(' Added Successfully', 1);
        this.projectOrderForm.reset();  
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }
  getProject(project:any){
    this.searchProject=project.value;
  }

}
