import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DivisionService } from 'src/app/app-root/setup-service/org-setup/division/division.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { OrgSetupService } from '../../../setup-service/org-setup/org-setup.service';
import { Division } from '../division.model';



@Component({
  selector: 'app-view-division',
  templateUrl: './view-division.component.html',
  styleUrls: ['./view-division.component.scss']
})
export class ViewDivisionComponent implements OnInit {

  divisionsForm: any = FormGroup;
  update: boolean = false;
  divisionData$: any = this.service.divisionData;



  constructor(private service: OrgSetupService,
    private fb: FormBuilder,
    private notification: NotifierService,
    private org: DivisionService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Division) { }



  ngOnInit(): void {

    this.divisionsForm = this.fb.group({
      code: [],
      name: [],
      description: [],
    });

    if (this.data != null) {
      this.update = true;
      this.editData()
    }
  }


  editData() {
    this.divisionsForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description,

    })
  }


  updateDivision() {
    this.data.name = this.divisionsForm.value.name;
    this.data.code = this.divisionsForm.value.code;
    this.data.description = this.divisionsForm.value.description;
    this.org.postDivision(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Division Updated Successfully', 1);
    })
    this.divisionsForm.reset();
  }

  public addItem(): any {
    if (this.divisionsForm.valid == true) {
      var dataRow: any = this.divisionsForm.value;
      this.org.postDivision(dataRow).subscribe((data: Division) => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Division Added Successfully', 1);
      })
      this.divisionsForm.reset();

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0);
    }
  }



}
