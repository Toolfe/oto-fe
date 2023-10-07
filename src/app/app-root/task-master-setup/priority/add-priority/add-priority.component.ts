import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriorityService } from 'src/app/app-root/setup-service/task-master-setup/priority/priority.service';
import { TaskMasterSetupService } from 'src/app/app-root/setup-service/task-master-setup/task-master-setup.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Priority } from '../prority.model';

@Component({
  selector: 'app-add-priority',
  templateUrl: './add-priority.component.html',
  styleUrls: ['./add-priority.component.scss']
})
export class AddPriorityComponent implements OnInit {
  priorityForm:any=FormGroup;

  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private tasksetup:PriorityService,
              @Inject(MAT_DIALOG_DATA) public data:Priority) { }

  ngOnInit(): void {
    
    this.priorityForm=this.fb.group({
      priority1:[],
      priority2:[],
      priority3:[],
      priority4:[],
      priority5:[],

    });
  
  }

  public addItem(): any {
    if (this.priorityForm.valid == true) {
      let dataRow: any = this.priorityForm.value;
      dataRow.active = true;
      this.tasksetup.postPriority(dataRow).subscribe(data => {
      
        this.notification.openSnackBar('Priority Added Successfully', 1);
      })
    
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }
}