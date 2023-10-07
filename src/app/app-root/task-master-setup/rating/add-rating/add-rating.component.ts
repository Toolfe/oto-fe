import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RatingService } from 'src/app/app-root/setup-service/task-master-setup/rating/rating.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Rating } from '../rating.model';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {
  ratingForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private service:RatingService,
              public dialogRef: MatDialogRef<any>,  
              @Inject(MAT_DIALOG_DATA) public data:Rating) { }

  ngOnInit(): void {
    this.ratingForm=this.fb.group({
      code:[],
      value:[],
    });
    if(this.data!=null){
      this.update = true;
      this.editData()
    }
  }
  editData(){
    
    this.ratingForm.patchValue({
      code: this.data.code,
      value: this.data.value,
    })
  }

  
  updateRating() {
    this.data.code = this.ratingForm.value.code;
    this.data.value = this.ratingForm.value.value;
    
    this.service.updateRating(this.data).subscribe(res => {
    
      this.dialogRef.close("Done");
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.ratingForm.reset();
  }

  public addItem(): any {
    if (this.ratingForm.valid == true) {
      var dataRow: any = this.ratingForm.value;
      dataRow.active = true;
      this.service.postRating(dataRow).subscribe(data => {
        
        this.dialogRef.close(data);
        this.notification.openSnackBar('Rating Added Successfully', 1);
      })
      this.ratingForm.reset();
    
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }


}
