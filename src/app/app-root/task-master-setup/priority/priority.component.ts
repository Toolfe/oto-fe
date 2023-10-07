import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { PriorityService } from '../../setup-service/task-master-setup/priority/priority.service';
import { TaskMasterSetupService } from '../../setup-service/task-master-setup/task-master-setup.service';
import { AddPriorityComponent } from './add-priority/add-priority.component';


 
export class priority {
  priority1!: string;
  priority2!:string
  priority3!:string
  priority4!:string
  priority5!:string
  setup:Setup=new Setup();

}
export class Setup {
  id: any=sessionStorage.getItem('orgId');
}
@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {

priority!: priority;

$priority:any;
  constructor(private dialog:MatDialog,
              private notification:NotifierService,
              private tasksetup:PriorityService,
           ) { }


           isEnable(permision:any){
            return  CommonMethods.userRole('taskMasterModule','priority',permision );
           }

  ngOnInit(): void {
  this.getPriority();
this.priority={
  priority1:'overriding',
  priority2:'Over',
  priority3:'Subjective',
  priority4:'Sub',
  priority5:'Normal',
  setup:new Setup()
}

  }



onSubmit(){


}
public addItem(): any {
  if (this.priority) {
    var dataRow: any = this.priority;
    dataRow.active = true;
    this.tasksetup.postPriority(dataRow).subscribe(() => {
      
      this.notification.openSnackBar('Priority Added Successfully', 1);
    })
    
  }
  else {
    this.notification.openSnackBar('Please fill all required fields to continue',0);
  }
}

getPriority(){
  this.tasksetup.getPriority().subscribe((res:any)=>{
    
    this.$priority=res.content;
    
    
  });
  }

  addNew(){ 
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
  this.dialog.open(AddPriorityComponent,dialogConfig);
}
deleteItem(data:any){
  data.active=false;
  }
 
}
