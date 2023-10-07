import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetScaleRangeService } from 'src/app/app-root/setup-service/task-master-setup/scale/set-scale-range.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Status } from '../../status/status.model';


@Component({
  selector: 'app-set-range',
  templateUrl: './set-range.component.html',
  styleUrls: ['./set-range.component.scss']
})
export class SetRangeComponent implements OnInit {
  update!:boolean;

  
  scaleSetRangeForm:any=FormGroup;
  constructor(private fb:FormBuilder,
    private service:SetScaleRangeService,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,  
    @Inject(MAT_DIALOG_DATA)public data:any) {
   
     }

  ngOnInit(): void {
    this.scaleSetRangeForm=this.fb.group({
      minimumRange:['',Validators.required],
      maximumRange:['',Validators.required],
    })
    if(this.data!=null){
      this.update = true;
      this.editData()
    }
  }

  editData(){
  
    this.scaleSetRangeForm.patchValue({
      minimumRange: this.data.minimumRange,
      maximumRange: this.data.maximumRange
     
    })
  }




 get minimumRange() {
    return this.scaleSetRangeForm.controls['minimumRange'];
}
get maximumRange() {
    return this.scaleSetRangeForm.controls['maximumRange'];
}
  


  
  public addRange(): any {
    if (this.scaleSetRangeForm.valid == true) {
     if(this.scaleSetRangeForm.value.minimumRange<this.scaleSetRangeForm.value.maximumRange)
     {
      var dataRow: any = this.scaleSetRangeForm.value;
      dataRow.active = true;
      this.service.postScaleRange(dataRow).subscribe((data: any) => {
        sessionStorage.setItem('minimumRange',data.minimumRange);
        
        this.dialogRef.close("Done");
        this.notification.openSnackBar('Scale Range Added Successfully', 1);
      })
      this.scaleSetRangeForm.reset();
      
     }else{
       this.notification.openSnackBar("Minimum range should be Lesser than Maximum Range",2);
     }
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }

  updateRange()
  {

      this.data.minimumRange = this.scaleSetRangeForm.value.minimumRange;
      this.data.maximumRange = this.scaleSetRangeForm.value.maximumRange;
      this.service.updateScaleRange(this.data).subscribe(res => {
        this.dialogRef.close(res); 
        this.notification.openSnackBar(' Updated Successfully', 1);
      })
  
    } 
  }
 




