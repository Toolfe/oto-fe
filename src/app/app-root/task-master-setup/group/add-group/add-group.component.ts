import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupService } from 'src/app/app-root/setup-service/task-master-setup/group/group.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Group } from '../group.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  groupForm: any = FormGroup;
  type$ = this.type.type$;
  searchTaskType!: string;
  update: boolean = false;
  constructor(
    private fb: FormBuilder,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<any>,
    private service: GroupService,
    private type: TypeService,
    @Inject(MAT_DIALOG_DATA) public data: Group
  ) {}

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      taskType:[],
      code: [],
      name: [],
    });
    
    if (this.data != null) {
      this.update = true;
      this.editData();
    }
  }

  editData() {
    this.groupForm.patchValue({
      code: this.data.code,
      name: this.data.name,
      taskType: CommonMethods.getFormArray(this.data.taskTypeObject.map((id: any) => {
        return id;
      })),
    });
  }


  updateTaskType() {
    let obj: any = {};
    let ObjArray: any[] = [];
    this.groupForm.value.taskType.id.forEach((id: any) => {
      obj.id = id;
      ObjArray.push(obj);
      obj = {};
    });
    this.groupForm.value.taskType = ObjArray;
  }

  updateGroup() {
 
    this.data.taskType=this.groupForm.value.taskType;
    this.data.code = this.groupForm.value.code;
    this.data.name = this.groupForm.value.name;
    this.service.updateGroup(this.data).subscribe((res) => {
      this.dialogRef.close(res);
      this.notification.openSnackBar(' Updated Successfully', 1);
    });
    this.groupForm.reset();
  }

  public addItem(): any {
    if (this.groupForm.valid == true) {
  
      let dataRow: any = this.groupForm.value;
      dataRow.taskType=dataRow.taskType;
      dataRow.active = true;
    
      this.service.postGroup(dataRow).subscribe((data) => {
        
        this.dialogRef.close(data);
        this.notification.openSnackBar('Group Added Successfully', 1);
      });
      this.groupForm.reset();
      
    } else {
      this.notification.openSnackBar(
        'Please fill all required fields to continue',
        0
      );
    }
  }
  getTaskType(taskType: any) {
    this.searchTaskType = taskType.value;
  }
}
