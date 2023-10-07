import { AfterContentInit, AfterViewInit, Component, Inject, Input, OnInit ,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from 'src/app/app-root/setup-service/org-setup/location/location.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { OrgSetupService } from '../../../setup-service/org-setup/org-setup.service';
import { Location } from '../location.model';


@Component({
  selector: 'app-view-locations',
  templateUrl: './view-locations.component.html',
  styleUrls: ['./view-locations.component.scss'],

})
export class ViewLocationsComponent implements OnInit {

  orgLocationForm:any=FormGroup
  update: boolean = false;
 
  constructor(private fb: FormBuilder,
             private notification:NotifierService,
             private org:LocationService,
             public dialogRef: MatDialogRef<any>,
             @Inject(MAT_DIALOG_DATA) public data:Location
             ) {}

         

  ngOnInit(): void {

      this.orgLocationForm = this.fb.group({
        code:[],
        name:[],
        description:[],
      });
      if(this.data!=null){
        this.update = true;
        this.editData()
      }
  }


  editData(){
    this.orgLocationForm.patchValue({
      code: this.data.code,
      name: this.data.name,
      description: this.data.description
    })
  }

  
  updateLocation() {
    this.data.name = this.orgLocationForm.value.name;
    this.data.code = this.orgLocationForm.value.code;
    this.data.description = this.orgLocationForm.value.description; 
    this.org.postLocation(this.data).subscribe(res => {
     this.dialogRef.close("done");
      this.notification.openSnackBar('Location Updated Successfully', 1);
    })
    this.orgLocationForm.reset();
  }

  public addItem(): any {
    if (this.orgLocationForm.valid == true) {
      var dataRow: any = this.orgLocationForm.value;
      this.org.postLocation(dataRow).subscribe((data:Location) => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Location Added Successfully', 1);
      })
      this.orgLocationForm.reset();
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }



}


