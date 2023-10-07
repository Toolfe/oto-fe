import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { KpiService } from 'src/app/app-root/setup-service/task-master-setup/kpi/kpi.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Kpi } from '../kpi.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-kpi',
  templateUrl: './add-kpi.component.html',
  styleUrls: ['./add-kpi.component.scss']
})
export class AddKpiComponent implements OnInit {

  kpiForm: any = FormGroup;
  update: boolean = false;
  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    private service: KpiService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Kpi) { }

  ngOnInit(): void {
    this.kpiForm = this.fb.group({
      code: [],
      name: [],
    });
    if (this.data != null) {
      this.update = true;
      this.editData()
    }
  }
  editData() {

    this.kpiForm.patchValue({
      code: this.data.code,
      name: this.data.name,
    })
  }


  updateKpi() {
    this.data.code = this.kpiForm.value.code;
    this.data.name = this.kpiForm.value.name;
    this.service.updateKpi(this.data).subscribe(res => {
      this.dialogRef.close("Done");
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.kpiForm.reset();
  }

  kpi() {
    this.service.getKpi();
  }

  public addItem(): any {
    if (this.kpiForm.valid == true) {
      var dataRow: any = this.kpiForm.value;
      dataRow.active = true;
      this.service.postKpi(dataRow).subscribe(data => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Kpi Added Successfully', 1);
      })
      this.kpiForm.reset();

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0);
    }
  }

}
