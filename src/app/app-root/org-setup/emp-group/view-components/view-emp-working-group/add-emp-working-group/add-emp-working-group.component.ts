import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkingGroupService } from 'src/app/app-root/setup-service/org-setup/working-group/working-group.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { WorkingGroup } from '../working-group.model';

@Component({
  selector: 'app-add-emp-working-group',
  templateUrl: './add-emp-working-group.component.html',
  styleUrls: ['./add-emp-working-group.component.scss']
})
export class AddEmpWorkingGroupComponent implements OnInit {

  empWorkForm: any = FormGroup
  update: boolean = false;
  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<any>,
    private org: WorkingGroupService,
    @Inject(MAT_DIALOG_DATA) public data: WorkingGroup,) { }

  ngOnInit(): void {
    this.empWorkForm = this.fb.group({
      name: [],
      description: [],
      setup: this.fb.group({
        id: sessionStorage.getItem('orgId')
      }),
    })
    if (this.data != null) {
      this.update = true;
      this.editData()
    }
  }
  public addItem() {
    if (this.empWorkForm.valid == true) {
      this.org.getWorkingGroup().subscribe(res => {
        let dataRow = this.empWorkForm.value;
        this.org.postWorkingGroup(dataRow).subscribe(res => {
          this.dialogRef.close(res);
          this.notification.openSnackBar('Employee Working Group Added Successfully', 1);
        })
        this.empWorkForm.reset();
      })
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0)
    }

  }

  editData() {
    this.empWorkForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description,
    })
  }


  updateWorkingGroup() {
    this.data.name = this.empWorkForm.value.name;
    this.data.description = this.empWorkForm.value.description;
    this.org.postWorkingGroup(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Employee Working Group Updated Successfully', 1);
    })
    this.empWorkForm.reset();
  }
}