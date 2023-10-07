import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpectationService } from 'src/app/app-root/setup-service/task-master-setup/expectation/expectation.service';
import { TaskMasterSetupService } from 'src/app/app-root/setup-service/task-master-setup/task-master-setup.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Expectation } from '../expectation.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expectation',
  templateUrl: './add-expectation.component.html',
  styleUrls: ['./add-expectation.component.scss']
})
export class AddExpectationComponent implements OnInit {

  expectationForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              public dialogRef: MatDialogRef<any>,  
              private tasksetup:ExpectationService,
              @Inject(MAT_DIALOG_DATA) public data:Expectation
              ) { }

  ngOnInit(): void {
    this.expectationForm=this.fb.group({
      name:[],
    })
    if(this.data!=null){
      this.update = true;
      this.editData()
    }
  }
  editData(){
    
    this.expectationForm.patchValue({
      name: this.data.name
    })
  }

  
  updateExpectation() {
    this.data.name = this.expectationForm.value.name;
    this.tasksetup.updateExpectation(this.data).subscribe(res => {
      this.dialogRef.close("Done");
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.expectationForm.reset();
  }

  public addItem(): any {
    if (this.expectationForm.valid == true) {
      var dataRow: any = this.expectationForm.value;
      dataRow.active = true;
      this.tasksetup.postExpectation(dataRow).subscribe(data => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Expectation Added Successfully', 1);
      })
      this.expectationForm.reset();
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }


}