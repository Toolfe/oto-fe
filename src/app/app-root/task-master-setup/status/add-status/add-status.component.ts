import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StatusService } from 'src/app/app-root/setup-service/task-master-setup/status/status.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Status } from '../status.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss']
})
export class AddStatusComponent {
  genericStatus: string[] = ['Todo', 'InProgress', 'Done'];
  statusForm: any = FormGroup;
  update: boolean = false;
  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<any>,
    private service: StatusService,
    @Inject(MAT_DIALOG_DATA) public data: Status) { }


  ngOnInit(): void {
    this.statusForm = this.fb.group({
      genericStatus: [],
      customizedStatus: []
    });
    if (this.data != null) {
      this.update = true;
      this.editData()
    }
  }
  editData() {
    this.statusForm.patchValue({
      genericStatus: this.data.name,
      customizedStatus: this.data.type,
    })
  }
  updateStatus() {
    this.data.genericStatus = this.statusForm.value.genericStatus;
    this.data.customizedStatus = this.statusForm.value.customizedStatus;
    
    this.service.updateStatus(this.data).subscribe(res => {
    
      this.dialogRef.close("Done");
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.statusForm.reset();
  }

  public addItem(): any {
    if (this.statusForm.valid == true) {
      var dataRow: any = this.statusForm.value;
      dataRow.active = true;
      this.service.postStatus(dataRow).subscribe(data => {
        
        this.dialogRef.close(data);
        this.notification.openSnackBar('Status Added Successfully', 1);
      })
      this.statusForm.reset();
      
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0);
    }
  }


}
