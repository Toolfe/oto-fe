import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ScaleService } from 'src/app/app-root/setup-service/task-master-setup/scale/scale.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Scale } from '../scale.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetScaleRangeService } from 'src/app/app-root/setup-service/task-master-setup/scale/set-scale-range.service';


@Component({
  selector: 'app-add-scale',
  templateUrl: './add-scale.component.html',
  styleUrls: ['./add-scale.component.scss']
})
export class AddScaleComponent implements OnInit {

  update!: boolean;
  scaleForm: any = FormGroup;
  type$ = this.type.type$;

  scalerange$ = this.scaleRange.minimumRange$;



  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    private service: ScaleService,
    private scaleRange: SetScaleRangeService,
    public dialogRef: MatDialogRef<any>,
    private type: TypeService,
    @Inject(MAT_DIALOG_DATA) public data: Scale) { }


  ngOnInit(): void {
    this.scaleRange.getScaleRange().subscribe((res: any) => {

    })
    this.scaleForm = this.fb.group({
      taskType: [],
      scaleValue: [],
    })
    if (this.data != null) {
      this.update = true;
      this.editData()
    }

  }

  ngAfterViewInit(): void {

    this.getScaleRange();
  }
  getScaleRange() {
    this.scaleRange.getScaleRange().subscribe((res: any) => {

    })
  }

  editData() {

    this.scaleForm.patchValue({
      scaleValue: this.data.scaleValue,
      taskType: this.data.taskType,
    })
  }


  updateScale() {
    this.data.scaleValue = this.scaleForm.value.scaleValue;
    this.data.taskType = this.scaleForm.value.taskType;

    this.service.updateScale(this.data).subscribe(res => {

      this.dialogRef.close(res);
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.scaleForm.reset();
  }


  public addItem(): any {
    if (this.scaleForm.valid == true) {
      let dataRow: any = this.scaleForm.value;
      dataRow.active = true;
      this.service.postScale(dataRow).subscribe(data => {

        this.dialogRef.close(data);
        this.notification.openSnackBar('Scale Added Successfully', 1);
      })
      this.scaleForm.reset();

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0);
    }
  }

}